import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Typography from '../components/Typography';
import Menu from '../components/Menu';
import Me from '../components/Me';
import { theme as color } from '../constants/Colors';

export default class ContactScreen extends React.PureComponent<{}, {}> {
  static navigationOptions = {
    title: 'Programa',
    headerLeft: <Menu  variant />,
    headerRight: <Me />,
    headerTintColor: color.BLUE,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Typography kind="welcome">ReciclaAPP</Typography>
          <Typography kind="instructions">
          Balneário Camboriú está mobilizada nesse importante programa social, econômico e ambiental que vai fazer
de nossa cidade referência mundial em reciclagem.
Serão mais ecopontos, mais equipes de coleta seletiva
e novos centros de triagem, um esforço que passa
pela separação do lixo comum do lixo reciclável.
Com a sua participação, vamos alcançar um padrão europeu de sustentabilidade, mostrar que somos educados e que amamos nossa BC.

          </Typography>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/programa.png')} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 30
  },
  logoContainer: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -45
  }
});
