import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';
import SettingsRow from '../components/SettingsRow';
import { clearStorage, logout } from '../utils/asyncStorage';
import * as Linking from 'expo-linking';
import { ENV } from '../environment';
import Analytics from '../services/Analytics';
import { client } from '../services/apollo';
import { NavigationWrapper } from '../components/NavigationWrapper';
import { AuthContext } from '../navigation/AuthContext';
import { StackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';

const DEVELOPER_ENABLE_TIMEOUT_MS: number = 750;
const DEVELOPER_ENABLE_NUM_TAPS: number = 5;
const FeedbackLink: string = 'mailto:fernando.pereira@stqpublicidade.com.br?subject=Recicla BC [ Feedback ]'
const SendAErrorLink: string = 'mailto:fernando.pereira@stqpublicidade.com.br?subject=Recicla BC [ Erro ]'

export const SettingsScreen = ({ navigation }: StackScreenProps<MainStackParamList>) => {
  // const [points, setPoints] = useState(false)
  const [devMode, setDevMode] = useState(false)
  const [taps, setTaps] = useState(0)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const { signOut } = React.useContext(AuthContext);

  const _signOutAsync = async () => {
    await logout();
    client.resetStore()
    signOut();
  };

  const goToLink = (url: string): void => {
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

  const onAboutPressed = () => {
    if (!devMode) {
      if (timerId != null) {
        clearTimeout(timerId);
        setTimerId(null);
      }
      if (taps >= DEVELOPER_ENABLE_NUM_TAPS) {
        setDevMode(true)
        if (timerId != null) {
          clearTimeout(timerId);
          setTimerId(null);
        }
      } else {
        setTaps(taps + 1)
        const newTimerId = setTimeout(() => {
          setTaps(0)
        }, DEVELOPER_ENABLE_TIMEOUT_MS);
        setTimerId(newTimerId);
      }
    }
  }

  useEffect(() => {
    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

    return (
      <NavigationWrapper drawer={true} variant={true}>
        <ScrollView style={styles.container}>
          {/* <Typography kind="welcome" style={{ marginBottom: 0 }}>Notificações</Typography>
          <SettingsRow onPress={() => this.setState({ points: !points }) } isSwitch={true} switchValue={points} label="Avisar dias de sorteios"/>
          <View style={{ paddingTop: 35 }}/> */}

          <TouchableOpacity
            onPress={() => onAboutPressed()}
          ><Typography kind="welcome" style={{ marginBottom: 0 }}>Informaçōes</Typography></TouchableOpacity>
          <SettingsRow onPress={() => navigation.navigate('About')} label="Sobre o APP" />
          <SettingsRow onPress={() => WebBrowser.openBrowserAsync(ENV.SUPPORT_URL)} label="Política de Privacidade" />
          <View style={{ paddingTop: 35 }} />

          {devMode &&
            <>
              <Typography kind="welcome" style={{ marginBottom: 0 }}>Modo desenvolvedor</Typography>
              <SettingsRow onPress={() => { }} label="Push Notification" />
              <SettingsRow onPress={() => {
                _signOutAsync()
                clearStorage()
              }} label="Clean storage" />
              <SettingsRow onPress={() => setDevMode(false)} label="Turn off develop mode" />
              <View style={{ paddingTop: 35 }} />
            </>
          }

          <Typography kind="welcome" style={{ marginBottom: 0 }}>Configurações gerais</Typography>
          <SettingsRow onPress={() => goToLink(FeedbackLink)} label="Enviar feedback" />
          <SettingsRow onPress={() => goToLink(SendAErrorLink)} label="Reportar erro" />
          <SettingsRow onPress={_signOutAsync} label="Sair" textStyle={{ color: color.RED, fontWeight: '700' }} />
          <View style={{ padding: 30 }} />
        </ScrollView>
      </NavigationWrapper>
    )
  }

export default SettingsScreen

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
