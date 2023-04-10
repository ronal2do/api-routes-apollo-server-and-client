import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Keyboard } from 'react-native'

import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';
import UploadableAvatar from '../components/UploadableAvatar';
import SettingsRow from '../components/SettingsRow';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationWrapper } from '../components/NavigationWrapper';

const ProfileScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [showImage, setShowImage] = useState(true)
  const { me } = route.params;
  
  if ( me == null) return <Typography kind='instructions'>Profile not found</Typography>

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setShowImage(false));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setShowImage(true));
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <NavigationWrapper variant={true}>
      <ScrollView style={styles.container}>
        {showImage && 
        <View style={styles.header}>
          <UploadableAvatar image={me.image} userId={me._id} name={me.name}/>
          <Typography kind="title">{me.name}</Typography>
          <Typography kind="instructions">{me.email}</Typography>
          {me.cpf && <Typography kind="instructions" color={color.GREEN}>{`CPF ${me.cpf}`}</Typography>}
          <Typography kind="instructions" color={color.GREEN}>{`Você tem ${me.points || 0} pontos`}</Typography>
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
          onPress={() => navigation.navigate('ChangePassword')}
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
      
    </NavigationWrapper>
  )
}

export default ProfileScreen

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
