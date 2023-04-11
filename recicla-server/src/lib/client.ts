import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
let client: ApolloClient<any> | null = null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        // uri:"http://localhost:3000/api/graphql",
        uri:"https://reciclaapp.vercel.app/api/graphql",
      }),
      cache: new InMemoryCache(),
    });
  }

  return client;
};