'use client';

import { ApolloProvider } from '@apollo/client';
import { getClient } from '@/lib/client';

export function Providers({ children }) {
  const client = getClient();
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}