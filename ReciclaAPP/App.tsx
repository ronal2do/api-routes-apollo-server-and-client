import {AppNavigator, AuthStackScreens, MyDrawerNavigator, Stack} from './navigation/AppNavigator';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/apollo';
import * as Linking from 'expo-linking';

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_KEYS } from './utils/asyncStorage';
import { NavigationContainer } from '@react-navigation/native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function getActiveRouteName(navigationState: any = null): string | null {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export const AuthContext = React.createContext();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null)

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          console.warn('SIGN_IN',action.token)
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (token: string) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token });
      },
    }),
    []
  );

  useEffect(() => {
    async function prepare() {
      let userToken;

      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
        userToken = await AsyncStorage.getItem(APP_KEYS.LOGIN)

        setToken(userToken)
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const prefix = Linking.createURL('/');
  console.log('@@ prefix', prefix)
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authContext}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* {Platform.OS === 'ios' && <StatusBar />} */}
        <AppNavigator userToken={state.userToken} loading={state.isLoading}/> 
      </View>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#315b6e'
  }
});
