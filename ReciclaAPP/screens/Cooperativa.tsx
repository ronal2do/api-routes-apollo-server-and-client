import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Typography from '../components/Typography';
import Menu from '../components/Menu';
import { theme as color } from '../constants/Colors';
import Me from '../components/Me';
import { NavigationWrapper } from '../components/NavigationWrapper';

type ContactScreenProps = {};

export default class ContactScreen extends React.PureComponent<ContactScreenProps, {}> {
  static navigationOptions = {
    title: 'Cooperativa',
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
      <NavigationWrapper drawer={true} variant={true}>
        <View style={styles.container}>
          <Typography kind="welcome">Cooperativas</Typography>
          <Typography kind="instructions">
            Além dos ganhos ambientais, o ReciclaAPP cumpre importante função social. Uma grande parceria público e privado vai acolher e capacitar catadores e carrinheiros, transformando-os em agentes de reciclagem organizados em cooperativas. No lugar das condições precárias de trabalho e da sujeira nas ruas, teremos uma coleta regularizada e uma renda digna para muitas famílias.
          </Typography>
        </View>
        <View style={styles.logoContainer}>
          <Image style={{ height: 250 }} resizeMode="contain" source={require('../assets/images/cooperativas.png')} />
        </View>
      </NavigationWrapper>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: -45
  }
});
