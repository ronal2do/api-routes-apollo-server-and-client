
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LogoTitle from '../components/LogoTitle';
import Menu from '../components/Menu';
import Me from '../components/Me';


type MorePointsScreenProps = {
  navigation: any;
}

export default class MorePointsScreen extends React.PureComponent<MorePointsScreenProps, {}> {
  static navigationOptions = () => {
    return {
      drawerLabel: 'Ganhar mais pontos',
      headerTitle: <LogoTitle />,
      headerLeft: <Menu />,
      headerRight: <Me />
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="convidar amigos"
        />
        <Button
          onPress={() => this.props.navigation.toggleDrawer()}
          title="completar cadastro"
        />
        <Button
          onPress={() => this.props.navigation.toggleDrawer()}
          title="Gincana semanal"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
