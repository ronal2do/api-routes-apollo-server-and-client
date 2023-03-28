import React, { useCallback } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';
import SettingsRow from '../components/SettingsRow';
import { ENV } from '../environment';

const AboutScreen = () => {
  const handlePressButtonAsync = useCallback(async () => {
    await WebBrowser.openBrowserAsync(ENV.STQ_URL);
  }, []);

  const goTo = useCallback((route: string) => {
    // router.push(route);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.optionButton}>
        <Typography kind="instructions">Versão do APP: {String(Constants.manifest?.version || 0)}</Typography>
      </View>
      <View style={styles.optionButton}>
        <Typography kind="instructions">Native App Version: {String(Constants.nativeAppVersion || 0)}</Typography>
      </View>
      <SettingsRow onPress={handlePressButtonAsync} label="Desenvolvedora: STQ Digital" />
      <SettingsRow onPress={() => goTo('Licences')} label="Licenças de terceira parte" />
      <View style={{ padding: 35 }} />
    </ScrollView>
  );
};

export default AboutScreen;

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
