import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

const AuthLoadingScreen: React.FC<{}> = () => {
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;