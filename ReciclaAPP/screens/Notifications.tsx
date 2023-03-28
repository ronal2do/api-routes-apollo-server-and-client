// import React, { PureComponent } from 'react';
// import { AsyncStorage, StyleSheet, View, Button } from 'react-native';
// import { NavigationScreenProp } from 'react-navigation';

// type MyNotificationsScreenProps = {
//   navigation: NavigationScreenProp<any, any>
// };

// export default class MyNotificationsScreen extends PureComponent<
//   MyNotificationsScreenProps,
//   {}
// > {

//   static navigationOptions = {
//     drawerLabel: 'Notifications',
//     // drawerIcon: ({ tintColor }) => (
//     //   <Image
//     //     source={require('./notif-icon.png')}
//     //     style={[styles.icon, {tintColor: tintColor}]}
//     //   />
//     // ),
//   };

//   _showMoreApp = () => {
//     this.props.navigation.navigate('Home');
//   };

//   _signOutAsync = async () => {
//     await AsyncStorage.removeItem('@@_APP_TOKEN');
//     this.props.navigation.navigate('Auth');
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// });



import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Typography from '../components/Typography'
import Menu from '../components/Menu';
import PageFooter from '../components/PageFooter';
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import Me from '../components/Me';

type MyNotificationsScreenProps = {
  navigation: NavigationScreenProp<any, any>
};

export default class MyNotificationsScreen extends PureComponent<MyNotificationsScreenProps> {
  static navigationOptions = {
    title: 'Notificações',
    headerLeft: <Menu variant />,
    headerRight: <Me />,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <Typography kind="welcome">Datas, prêmios e regulamento.</Typography>
          <Typography kind="title">Sorteios</Typography>
          <Typography kind="instructions">
          Serão realizados 45 sorteios em cinco dias diferentes. Depois de converter os pontos em cupons, o saldo que ficar vale para a próxima troca e os cupons gerados valem para todos os sorteios.
          </Typography>
          <Typography kind="title">Prêmios</Typography>
          <Typography kind="instructions">31/08: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">14/09: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">28/09: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">12/10: 10 vale-compras de R$ 100 cada</Typography>
          <Typography kind="instructions">02/11: SmartTV, notebook, smartphone, bicicleta e patinete.</Typography>
          <Typography kind="title">Cupons</Typography>

          <Typography kind="instructions">Somente serão computados aqueles pontos
          que forem enviados até a véspera do dia do sorteio.</Typography>
          <Typography kind="instructions">Em até 24 horas, você receberá no e-mail cadastrado 
          os seus cupons numerados. 
          O saldo que ficar seguirá valendo para os sorteios futuros. Continue participando para aumentar 
          suas chances.</Typography>
        </ScrollView>
        <PageFooter />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 30,
  },
})
