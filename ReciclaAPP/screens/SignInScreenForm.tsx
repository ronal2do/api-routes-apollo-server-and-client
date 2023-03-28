import React, { PureComponent } from 'react';
import { Image, View, StyleSheet, Dimensions, Keyboard, TouchableOpacity, SafeAreaView, EventSubscription } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Yup from 'yup';
import { withFormik, FormikProps } from 'formik';

import { theme as color } from '../constants/Colors';
import LoginButton from '../components/LoginButton';
import AwesomeInput from '../components/AwesomeInput';
import Typography from '../components/Typography';

import { ENV } from '../environment';

const { width } = Dimensions.get('screen');

type SignInScreenFormState = {
  showImage: boolean
};

type SignInScreenFormProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any, mutation: any } & SignInScreenFormProps & FormikProps<SignInScreenFormProps>

class SignInScreenForm extends PureComponent<MixedProps, SignInScreenFormState> {
  keyboardDidShowListener!: EventSubscription;
  keyboardDidHideListener!: EventSubscription;
  input: any = null;

  static navigationOptions = {
    header: null
  }

  state = {
    email: '',
    password: '',
    showImage: true,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }

  _goTo = async (screen: string) => {
    this.props.navigation.navigate(screen);
  };

  _keyboardDidShow = () => this.setState({ showImage: false });
  _keyboardDidHide = () => this.setState({ showImage: true });

  _handlePressButtonAsync = async () => {
    WebBrowser.openBrowserAsync(ENV.SUPPORT_URL);
  };

  render() {
    const { showImage } = this.state;

    return (
      <>
        <SafeAreaView style={{ backgroundColor: color.GREEN }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
                ref={e => this.input = e}
                label={'E-mail'}
                onChange={(text) => this.props.setFieldValue('email', text)}
                value={this.props.email}
              />
              {this.props.errors.email && this.props.touched.email &&
                <Typography color={color.RED} kind="error">
                  {this.props.errors.email || ''}
                </Typography>
              }
              <AwesomeInput
                label={'Senha'}
                secureTextEntry={true}
                onChange={(text) => this.props.setFieldValue('password', text)}
                value={this.props.password}
              />
              {this.props.errors.password && this.props.touched.password &&
                <Typography color={color.RED} kind="error">
                  {this.props.errors.password || ''}
                </Typography>
              }
              {!showImage && (<>
                <View style={{ marginTop: 30 }} />
                <LoginButton label="Entrar" action={() => {
                  this.props.handleSubmit()
                }}
                />
              </>)}
            </View>

          </View>

          {!!showImage && (
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => this._goTo('SignUp')}
                style={{ height: 40 }}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Typography color={color.BLUE} kind="instructions" style={{ fontWeight: '700' }}>Ainda não tem conta? Criar conta</Typography>
              </TouchableOpacity>
              <LoginButton label="Entrar" action={() => {
                this.input && this.input.focus()

                if (this.props.email != null) {
                  this.props.handleSubmit()
                }
                this.props.handleSubmit()

              }} />
              <TouchableOpacity
                onPress={() => this._goTo('Forget')}
                style={{ height: 40 }}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Typography color={color.BLUE} kind="instructions" style={{ fontWeight: '700' }}>Esqueci a senha</Typography>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this._handlePressButtonAsync()}
                style={{ height: 40 }}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Typography color={color.BLUE} kind="small">
                  Ao entrar você concorda com os Política de Privacidade
              </Typography>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </>
    );
  }
}

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

export default withFormik<any, SignInScreenFormProps>({
  mapPropsToValues: () => ({ email: '', password: '' }),

  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(4, 'A senha deve ter no mínimo 4 caracteres')
      .required('Preencha o campo de Senha'),
    email: Yup.string()
      .email('O e-mail deve ser válido !')
      .required('Preencha o campo de e-mail'),
  }),

  handleSubmit: (
    values,
    { props, setSubmitting, setErrors, resetForm, setValues, setTouched }
  ) => {

    const a = props.mutation({
      variables:
      {
        email: values.email,
        password: values.password,
      },
    })
  },
})(SignInScreenForm)