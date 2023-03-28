import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Typography from '../components/Typography';
import { theme as color } from '../constants/Colors';
import Menu from '../components/Menu';
import Me from '../components/Me';
import { LIXO_COMUM_MOCK, LIXO_RECICLAVEL_MOCK } from '../constants/Data';

type ContactScreenProps = {};

export default class ContactScreen extends React.PureComponent<ContactScreenProps, {}> {
  static navigationOptions = {
    title: 'Separação',
    headerStyle: {
      backgroundColor: color.YELLOW,
      borderBottomWidth: 0,
    },
    headerLeft: <Menu />,
    headerRight: <Me />
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: color.YELLOW }}>
        <View style={styles.container}>
          <Typography color='#fff' kind='welcome'>
            Separar o lixo
          </Typography>
          <Typography color='#fff' kind='instructions'>
            Tenha duas lixeiras por perto, uma para o lixo comum (orgânico e rejeitos) e outra para os resíduos recicláveis (metal, papel, plástico e vidro).
          </Typography>

          <Typography color='#fff' kind='welcome' style={{ fontWeight: '700', marginTop: 30 }}>
            Lixo reciclável
          </Typography>
          {LIXO_RECICLAVEL_MOCK.map(({ id, title, text }) => (
            <View key={id}>
              <Typography color='#fff' kind='title'>
                {title}
              </Typography>
              {text.map((detail, index) => (
                <Typography key={index} color='#fff' kind='instructions'>
                  {detail}
                </Typography>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/separacao.png')} />
        </View>
        <View style={[styles.container, { backgroundColor: color.GREEN }]}>
          <Typography color='#fff' kind='welcome' style={{ fontWeight: '700', marginTop: 30 }}>
            Lixo comum
          </Typography>
          {LIXO_COMUM_MOCK.map(({ id, title, text }) => (
            <View key={id}>
              <Typography color='#fff' kind='title'>
                {title}
              </Typography>
              {text.map((detail, index) => (
                <Typography key={index} color='#fff' kind='instructions'>
                  {detail}
                </Typography>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 30
  },
  logoContainer: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: color.YELLOW,
    marginBottom: -45
  }
});
