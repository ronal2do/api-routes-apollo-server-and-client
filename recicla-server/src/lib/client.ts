import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
// import { setContext } from '@apollo/client/link/context'

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri:"https://reciclaapp.vercel.app",
      }),
      cache: new InMemoryCache(),
    });
  }

  return client;
};