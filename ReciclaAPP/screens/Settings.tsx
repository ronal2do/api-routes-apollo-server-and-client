import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import Typography from '../components/Typography'
import Menu from '../components/Menu';
import { theme as color } from '../constants/Colors';
import SettingsRow from '../components/SettingsRow';
import Me from '../components/Me';
import { clearStorage, logout } from '../utils/asyncStorage';
import * as Linking from 'expo-linking';
import { ENV } from '../environment';
import Analytics from '../services/Analytics';
import { client } from '../services/apollo';
import { NavigationWrapper } from '../components/NavigationWrapper';

const DEVELOPER_ENABLE_TIMEOUT_MS: number = 500;
const DEVELOPER_ENABLE_NUM_TAPS: number = 5;
const FeedbackLink: string = 'mailto://fernando.pereira@stqpublicidade.com.br?subject=Recicla BC [ Feedback ]'
const SendAErrorLink: string = 'mailto://fernando.pereira@stqpublicidade.com.br?subject=Recicla BC [ Erro ]'
export default class SettingsScreen extends PureComponent {
  public _timeoutId?: any;
  public _taps?: any;

  static navigationOptions = {
    title: 'Configurações',
    // @ts-ignore
    headerLeft: <Menu variant />,
    headerRight: <Me />,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  state = { points: false, devMode: false }

  _showMoreApp = () => {
    this.props.navigation.navigate('Home');
  };

  _signOutAsync = async () => {
    await logout();
    client.resetStore()
    this.props.navigation.navigate('Auth');
  };

  _goTo = (route: string) => {
    this.props.navigation.navigate(route);
  };

  goToLink = (url: string): void => {
    Linking.canOpenURL(url)
      .then((supported: boolean) => {
        if (!supported) {
          Analytics.track(Analytics.events.ERROR, { path: 'Settings.tsx', func: 'goToLink', error: "Can't handle url: " + url });
        } else {
          Analytics.track(Analytics.events.USER_OPEN_LINK, { url });
          return Linking.openURL(url);
        }
      })
      .catch((err: string) => Analytics.track(Analytics.events.ERROR, { path: 'Settings.tsx', func: 'goToLink', error: err }));
  }

  _onAboutPressed = () => {
    // if (!this.props.devMode) {
    if (!this.state.devMode) {
      if (this._timeoutId != undefined) {
        clearTimeout(this._timeoutId);
        this._timeoutId = undefined;
      }
      if (this._taps >= DEVELOPER_ENABLE_NUM_TAPS) {
        // this.props.enableDevelopers(true);
        this.setState({ devMode: true })
        clearTimeout(this._timeoutId);
        this._timeoutId = undefined;
      } else {
        this._taps++;
        this._timeoutId = setTimeout(() => {
          this._taps = 0;
        }, DEVELOPER_ENABLE_TIMEOUT_MS);
      }
    }
  }

  _handlePressButtonAsync = async () => {
    WebBrowser.openBrowserAsync(ENV.SUPPORT_URL);
  };

  componentWillUnmount() {
    if (this._timeoutId != null) {
      clearTimeout(this._timeoutId)
    }
  }

  render() {
    const { devMode, points } = this.state
    return (
      <NavigationWrapper drawer={true} variant={true}>
        <ScrollView style={styles.container}>
          {/* <Typography kind="welcome" style={{ marginBottom: 0 }}>Notificações</Typography>
          <SettingsRow onPress={() => this.setState({ points: !points }) } isSwitch={true} switchValue={points} label="Avisar dias de sorteios"/>
          <View style={{ paddingTop: 35 }}/> */}

          <TouchableOpacity
            onPress={() => this._onAboutPressed()}
          ><Typography kind="welcome" style={{ marginBottom: 0 }}>Informaçōes</Typography></TouchableOpacity>
          <SettingsRow onPress={() => this._goTo('About')} label="Sobre o APP" />
          <SettingsRow onPress={() => this._handlePressButtonAsync()} label="Política de Privacidade" />
          <View style={{ paddingTop: 35 }} />

          {devMode &&
            <>
              <Typography kind="welcome" style={{ marginBottom: 0 }}>Modo desenvolvedor</Typography>
              <SettingsRow onPress={() => { }} label="Push Notification" />
              <SettingsRow onPress={() => {
                this._signOutAsync()
                clearStorage()
              }} label="Clean storage" />
              <SettingsRow onPress={() => this.setState({ devMode: false })} label="Turn off develop mode" />
              <View style={{ paddingTop: 35 }} />
            </>
          }

          <Typography kind="welcome" style={{ marginBottom: 0 }}>Configurações gerais</Typography>
          <SettingsRow onPress={() => this.goToLink(FeedbackLink)} label="Enviar feedback" />
          <SettingsRow onPress={() => this.goToLink(SendAErrorLink)} label="Reportar erro" />
          <SettingsRow onPress={this._signOutAsync} label="Sair" textStyle={{ color: color.RED, fontWeight: '700' }} />
          <View style={{ padding: 30 }} />
        </ScrollView>
      </NavigationWrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 30,
  },
  optionButton: {
    paddingTop: 35,
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: color.GRAY,
    flexDirection: 'row',
  }
})
