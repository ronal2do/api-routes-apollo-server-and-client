import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Linking, TouchableOpacity } from 'react-native';
import Typography from '../components/Typography';
import Menu from '../components/Menu';
import { theme as color } from '../constants/Colors';
import Me from '../components/Me';
import SettingsRow from '../components/SettingsRow';

const links = [
  {link: 'mailto://contato@reclicabc.com.br', text: 'E-mail: contato@reclicabc.com.br'},
  {link: 'https://api.whatsapp.com/send?phone=5547996479495', text: 'WhatsApp: 996 479 495'},
  {link: 'https://reciclaapp.com.br', text: 'Site: reciclaapp.com.br'},
  {link: 'https://www.messenger.com/t/reciclaapp', text: 'Messenger: @ReciclaAPP'},
]

export default class ContactScreen extends PureComponent<{}, {}> {
  static navigationOptions = {
    title: 'Contato',
    headerLeft: <Menu variant />,
    headerRight: <Me />,
    headerTintColor: color.BLUE,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
  }

  goToLink = (url: string): void => {
    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Typography kind="welcome">Clique no canal desejado e fale com a gente</Typography>
          {links.map((l,i) =>
            <SettingsRow key={i} onPress={() => this.goToLink(l.link)} label={l.text}/>
          )}
        </View>
        <View style={styles.logoContainer}>
          <Image style={{ height: 250 }} resizeMode="contain" source={require('../assets/images/man.png')} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 30
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: -45
  }
});
