import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { theme as color } from '../constants/Colors';
import LoginButton from '../components/LoginButton';
import AwesomeInput from '../components/AwesomeInput';
import Typography from '../components/Typography';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ENV } from '../environment';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('screen');

type ProfileScreenNavigationProp = any['navigation'];

const SignInScreenForm = ({ mutation }: any) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>()
  const [showImage, setShowImage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = React.useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setShowImage(false));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setShowImage(true));
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(ENV.SUPPORT_URL);
  };

  const handleSubmit = async () => {
    const variables = {
      email,
      password
    }

    try {
      mutation({
        variables
      })
    } catch (err) {
      console.log('-== login', err)
    }
  }


  return (
    <>
    <View/>
      <View style={{ flex: 1, backgroundColor: '#fff',  paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right, }}>
        {!!showImage && (
          <View style={styles.header}>
            <Image style={{ height: 154 }} resizeMode="contain" source={require('../assets/images/header.png')} />
          </View>
        )}
  
        <View style={styles.container}>
          {!!showImage && (
            <View style={{ alignItems: 'flex-start' }}>
              <Typography color={color.BLUE} kind="welcome">
                Bem-vindo ao ReciclaAPP
            </Typography>
              <Typography color={color.BLUE} kind="instructions">
                Aqui você recicla e ganha prêmios.
            </Typography>
              <Typography color={color.BLUE} kind="instructions">
                Para entrar é só inserir e-mail e senha.
            </Typography>
            </View>
          )}
  
          <View style={styles.form}>
            <AwesomeInput
              ref={inputRef}
              label={'E-mail'}
              onChange={(text) => setEmail(text)}
              value={email}
            />
            {/* {errors.email && touched.email &&
              <Typography color={color.RED} kind="error">
                {errors.email || ''}
              </Typography>
            } */}
            <AwesomeInput
              label={'Senha'}
              secureTextEntry={true}
              onChange={(text) => setPassword(text)}
              value={password}
            />
            {/* {errors.password && touched.password &&
              <Typography color={color.RED} kind="error">
                {errors.password || ''}
              </Typography>
            } */}
            {!showImage && (<>
              <View style={{ marginTop: 30 }} />
              <LoginButton label="Entrar" action={() => {
                handleSubmit()
              }}
              />
            </>)}
          </View>
  
        </View>
  
        {!!showImage && (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{ height: 40 }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Typography color={color.BLUE} kind="instructions" style={{ fontWeight: '700' }}>Ainda não tem conta? Criar conta</Typography>
            </TouchableOpacity>
            <LoginButton label="Entrar" action={() => {
              if (email != null) {
                handleSubmit()
              }
            }} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Forget')}
              style={{ height: 40 }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Typography color={color.BLUE} kind="instructions" style={{ fontWeight: '700' }}>Esqueci a senha</Typography>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePressButtonAsync()}
              style={{ height: 40 }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Typography color={color.BLUE} kind="small">
                Ao entrar você concorda com os Política de Privacidade
            </Typography>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  )
}

SignInScreenForm.navigationOptions = {
  header: null,
};

export default SignInScreenForm;


const styles = StyleSheet.create({
  header: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: color.GREEN
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 40
  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 15
  },
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5
  },
  form: {
    width: width - 40,
    backgroundColor: '#F5FCFF',
    marginBottom: 15,
  },
  footer: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});