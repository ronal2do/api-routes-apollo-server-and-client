import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView, Image, ImageBackground, Keyboard } from 'react-native'

import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import { EventSubscription } from 'fbemitter';
import UploadableAvatar from '../components/UploadableAvatar';
import SettingsRow from '../components/SettingsRow';

type ProfileScreenProps = {
  navigation: NavigationScreenProp<any, any>
};

export default class ProfileScreen extends PureComponent {
  keyboardDidShowListener!: EventSubscription;
  keyboardDidHideListener!: EventSubscription;

  static navigationOptions = {
    title: 'Meu perfil',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }
  
  state = {
    showImage: true
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    )
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }

    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }
  
  _keyboardDidShow = () => 
    this.setState({ showImage: false })
  
  _keyboardDidHide = () => 
    this.setState({ showImage: true })

  render() {
    const me = this.props.navigation.getParam('me', {})
    return (
      <>
        <ScrollView style={styles.container}>
         {this.state.showImage && 
          <View style={styles.header}>
            <UploadableAvatar image={me.picture} userId={me._id} name={me.name}/>
            <Typography kind="title">{me.name}</Typography>
            <Typography kind="instructions">{me.email}</Typography>
            {me.cpf && <Typography kind="instructions" color={color.GREEN}>{`CPF ${me.cpf}`}</Typography>}
            <Typography kind="instructions" color={color.GREEN}>{`Você tem ${me.points.points || 0} pontos`}</Typography>
          </View>   
        }
       
          {/* <AwesomeInput
            label="Nome"
            value="Rafaela Orioli"
            onChange={() => {}}
            color={color.BLUE}
          />

          <AwesomeInput
            label="E-mail"
            value="Rafaela@Orioli.com"
            onChange={() => {}}
            color={color.BLUE}
          />

          <AwesomeInput
            label="Senha"
            value="12345"
            secureTextEntry={true}
            onChange={() => {}}
            color={color.BLUE}
          />
          <AwesomeInput
            label="Confirmar senha"
            value="12345"
            secureTextEntry={true}
            onChange={() => {}}
            color={color.BLUE}
          /> */}
          <View style={{ height: 80 }}/>
          <SettingsRow 
            label="Alterar senha"
            onPress={() => this.props.navigation.navigate('ChangePassword')}
          />
        </ScrollView>

        {/* <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 50 }}> */}
          {/* <Button
            backgroundColor={color.GREEN}
            raiseLevel={0}
            textColor="white"
            label="Salvar"
            onPress={() => {}}
          /> */}
          {/* <SettingsRow 
            label="Alterar senha"
            onPress={() => this.props.navigation.navigate('ChangePassword')}
          /> */}
        {/* </View> */}
        
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 30,
  },
  placeholder: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
