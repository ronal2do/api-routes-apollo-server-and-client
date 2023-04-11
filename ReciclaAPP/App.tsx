import {AppNavigator } from './navigation/AppNavigator';
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
import { AuthContext, AuthContextType } from './navigation/AuthContext';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
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

interface AppState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: null | { username: string; password: string };
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [state, dispatch] = React.useReducer(
    (prevState: AppState, action: any): any => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
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

  const authContext: AuthContextType = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token });
      },
    }),
    []
  );

  useEffect(() => {
    async function prepare() {
      let userToken;

      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
        userToken = await AsyncStorage.getItem(APP_KEYS.LOGIN)
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const prefix = Linking.createURL('/');
  console.log('@@ prefix', prefix)
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={authContext}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <AppNavigator state={state}/> 
        </View>
        </AuthContext.Provider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#315b6e'
  }
});
