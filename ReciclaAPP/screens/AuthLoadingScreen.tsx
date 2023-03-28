import React from 'react';

import { ActivityIndicator, StatusBar, View, AsyncStorage } from 'react-native';
import { APP_KEYS } from '../utils/asyncStorage';
import { NavigationScreenProp } from 'react-navigation';
import Analytics from '../services/Analytics';

type AuthLoadingScreenProps = {
  navigation: NavigationScreenProp<{}>
}

export default class AuthLoadingScreen extends React.PureComponent<AuthLoadingScreenProps, {}> {
  constructor(props: AuthLoadingScreenProps) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    Analytics.track(Analytics.events.BOOTSTRAP);

    const userToken = await AsyncStorage.getItem(APP_KEYS.LOGIN);
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
