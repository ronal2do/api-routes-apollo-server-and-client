import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { APP_KEYS } from '../utils/asyncStorage';
import Analytics from '../services/Analytics';

const AuthLoadingScreen: React.FC<{}> = () => {
  // const router = useRouter();

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    Analytics.track(Analytics.events.BOOTSTRAP);

    const userToken = await AsyncStorage.getItem(APP_KEYS.LOGIN);
    // router.push(userToken ? 'App' : 'Auth');
    console.log('AUTH LOADIGN')
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;