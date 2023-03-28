import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';
import SettingsRow from '../components/SettingsRow';
import { ENV } from '../environment';

export default class AboutScreen extends PureComponent {
  static navigationOptions = {
    title: 'Sobre o APP',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  _goTo = (route: string) => {
    this.props.navigation.navigate(route);
  };

  _handlePressButtonAsync = async () => {
    WebBrowser.openBrowserAsync(ENV.STQ_URL);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.optionButton}><Typography kind="instructions">Versão do APP: {String(Constants!.manifest!.version || 0)}</Typography></View>
        <View style={styles.optionButton}><Typography kind="instructions">Native App Version: {String(Constants!.nativeAppVersion || 0)}</Typography></View>
        <SettingsRow onPress={() => this._handlePressButtonAsync()} label="Desenvolvedora: STQ Digital" />
        <SettingsRow onPress={() => this._goTo('Licences')} label="Licenças de terceira parte"/>
        <View style={{ padding: 35 }}/>
      </ScrollView>
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
    paddingTop: 25,
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: color.GRAY,
    flexDirection: 'row',
  }
})
