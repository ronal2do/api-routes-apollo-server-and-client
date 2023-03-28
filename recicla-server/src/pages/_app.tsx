import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { theme } from '../lib/theme'
import { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo-client'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps: { session, ...pageProps }}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}