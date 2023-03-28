import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import * as Icon from '@expo/vector-icons'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import AppNavigator from './navigation/AppNavigator';
import LoadingSreen from './screens/LoadingScreen';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/apollo';
import Analytics from './services/Analytics';
import * as Linking from 'expo-linking';

import './services/reactotronConfig';

type AppState = {
  isLoadingComplete: boolean,
  isSplashReady: boolean,
  initialUrl?: string | undefined
};

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

export default class App extends React.PureComponent<{ skipLoadingScreen: boolean }, AppState> {
  state: AppState = {
    isLoadingComplete: false,
    isSplashReady: false,
    initialUrl: undefined
  };

  componentDidMount() {
    this.setupAsync()
    Linking.addEventListener('url', this.handleUrl)
  }

  handleUrl = (element: any) => {
    console.log('==>', element.url)
    let data = Linking.parse(element.url);
    console.log('handleUrl ==>', data)
  }

  setupAsync = async () => {
    const initialUrl: string | null = await Linking.getInitialURL();
    if (typeof initialUrl != "string") return;
    this.setState({ initialUrl }, () => console.log('initialUrl', initialUrl));
  }

  _loadResourcesAsync = async (): Promise<any> => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/home.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        // @ts-ignore
        ...Icon.Ionicons.font
      })
    ]);
  };

  _handleLoadingError = (error: Error): void => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    SplashScreen.hide();
    this.setState({ isSplashReady: true });
  };

  _cacheResourcesAsync = () => {
    this.setState({ isLoadingComplete: true });
  };

  renderContent() {
    const prefix = Linking.createURL('/');
    console.log('@@ prefix', prefix)
    if (!this.state.isSplashReady && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
          autoHideSplash={false}
        />
      );
    }
    if (!this.state.isLoadingComplete) {
      return <LoadingSreen onLoad={this._cacheResourcesAsync} />;
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {/* <AppNavigator
          uriPrefix={prefix}
          onNavigationStateChange={(prevState, currentState, action) => {
            const currentScreen = getActiveRouteName(currentState);
            const prevScreen = getActiveRouteName(prevState);
            if (prevScreen !== currentScreen) {
              Analytics.track(Analytics.events.USER_PAGE_VIEW, { view: currentScreen });
            }
          }}
        /> */}
      </View>
    );
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.renderContent()}
      </ApolloProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#315b6e'
  }
});
