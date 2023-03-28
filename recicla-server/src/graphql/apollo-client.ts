import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})