import React from 'react';
import { StyleSheet, Image, ScrollView, View, Platform } from 'react-native';
import Typography from '../components/Typography';
import Menu from '../components/Menu';
import Me from '../components/Me';
import { theme as color } from '../constants/Colors';
import Button from '../components/Button';
import { ENV } from '../environment';
import * as WebBrowser from 'expo-web-browser';

export default class CupomsScreen extends React.PureComponent<{}, {}> {
  static navigationOptions = {
    title: 'Sorteios',
    headerLeft: <Menu variant />,
    headerRight: <Me />,
    headerTintColor: color.BLUE,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
  }

  _handlePressButtonAsync = async () => {
    WebBrowser.openBrowserAsync(ENV.RULES_URL);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <Typography kind="welcome">Datas, prêmios e regulamento.</Typography> */}
        {/* <Typography kind="title">Sorteios</Typography> */}
        <Typography kind="instructions">
          Serão realizados 45 sorteios em cinco dias diferentes. Depois de converter os pontos em cupons, o saldo que ficar vale para a próxima troca e os cupons gerados valem para todos os sorteios.
        </Typography>
        <Typography kind="title">Prêmios</Typography>
        <Typography kind="instructions">31/08: 10 vale-compras de R$ 100 cada</Typography>
        <Typography kind="instructions">14/09: 10 vale-compras de R$ 100 cada</Typography>
        <Typography kind="instructions">28/09: 10 vale-compras de R$ 100 cada</Typography>
        <Typography kind="instructions">12/10: 10 vale-compras de R$ 100 cada</Typography>
        <Typography kind="instructions">02/11: SmartTV, notebook, smartphone e bicicleta.</Typography>
        <Typography kind="title">Regulamento</Typography>
        <Typography kind="instructions">
          {Platform.OS === 'ios' ? 'A Apple' : 'O Google'} não é um patrocinador do sorteio.
        </Typography>
        <View style={{ padding: 5 }} />
        <Typography kind="instructions">
          Você pode ter acesso a o regulamento completo pelo no botão abaixo
        </Typography>
        <View style={{ padding: 15 }} />
        <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white' }}>
          <Button
            backgroundColor={color.GREEN}
            raiseLevel={0}
            textColor="white"
            label="Regulamento completo"
            onPress={() => this._handlePressButtonAsync()}
          />
        </View>
        <View style={{ padding: 15 }} />
        <Image source={require("../assets/images/Logo-black.png")} />
        <View style={{ padding: 30 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 30
  }
});
