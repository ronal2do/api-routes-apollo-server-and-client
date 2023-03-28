import { AsyncStorage } from 'react-native';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ENV } from '../environment';
import { APP_KEYS } from '../utils/asyncStorage';

console.log('ENV', ENV)

const httpLink = createHttpLink({
  uri: ENV.API
});

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem(APP_KEYS.LOGIN);
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
});