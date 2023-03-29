import AsyncStorage from '@react-native-async-storage/async-storage';

import { ENV } from '../environment';
import { APP_KEYS } from '../utils/asyncStorage';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useEffect } from 'react';

const httpLink = createHttpLink({
  uri: ENV.API,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(APP_KEYS.LOGIN);
  return {
    headers: {
      ...headers,
      authorization: token || "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const useApolloClient = () => {
  useEffect(() => {
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    return () => {
      client.stop();
    };
  }, []);

  return client;
};
