import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView, Image, ImageBackground, Keyboard, EventSubscription } from 'react-native'
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';
import AwesomeInput from '../components/AwesomeInput';
import LoginButton from '../components/LoginButton';

type ProfileScreenFormProps = {
  navigation: any
  mutation: any,
};

type ProfileScreenFormState = { 
  showImage: boolean
};

type ProfileFormProps = {
  name: string,
  email: string,
  // password: string,
  // confirmPassword: string,
}

type MixedProps = ProfileScreenFormProps & ProfileFormProps & FormikProps<ProfileFormProps>


class ProfileScreenForm extends PureComponent<MixedProps, ProfileScreenFormState> {
  keyboardDidShowListener!: EventSubscription;
  keyboardDidHideListener!: EventSubscription;

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
    return (
      <>
        <ScrollView style={styles.container}>
         {this.state.showImage && <View style={styles.header}>
            <View style={styles.placeholder}>
              <ImageBackground 
                style={{ width: 230, height: 200, alignItems: 'flex-end', justifyContent: 'center' }} 
                source={require('../assets/images/avatar.png')}
                resizeMode="contain"
              >
                <Image source={require('../assets/images/cam.png')} />
              </ImageBackground>
            </View> 
            <Typography kind="title">Rafaela Orioli</Typography>
            <Typography kind="instructions" color={color.GREEN}>Você tem 510 pontos</Typography>
          </View> }

          <AwesomeInput
            label="Nome"
            color={color.BLUE}
            onChange={(text) => this.props.setFieldValue('name', text)}
            value={this.props.values.name}
          />

          <AwesomeInput
            label="E-mail"
            color={color.BLUE}
            onChange={(text) => this.props.setFieldValue('email', text)}
            value={this.props.values.email}
          />

          {/* <AwesomeInput
            label="Senha"
            secureTextEntry={true}
            color={color.BLUE}
            onChange={(text) => this.props.setFieldValue('password', text)}
            value={this.props.password}
          />

          <AwesomeInput
            label="Confirmar senha"
            color={color.BLUE}
            secureTextEntry={true}
            onChange={(text) => this.props.setFieldValue('confirmPassword', text)}
            value={this.props.confirmPassword}
          /> */}

          <View style={{ height: 80 }}/>
        </ScrollView>

        <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <LoginButton label="Salvar" action={() => {
            this.props.handleSubmit()
          }} />
        </View>
        
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


export default withFormik<any, ProfileFormProps>({
  mapPropsToValues: (props) => {
    return ({ name: props.me.name, email: props.me.email })
  },

  validationSchema: Yup.object().shape({
    name: Yup
      .string()
      .min(4, 'A senha deve ter no mínimo 4 caracteres')
      .required('Preencha o campo de Senha'),
    password: Yup
      .string()
      .min(4, 'A senha deve ter no mínimo 4 caracteres')
      .required('Preencha o campo de Senha'),
    email: Yup
      .string()
      .email('O e-mail deve ser válido !')
      .required('Preencha o campo de e-mail'),
    confirmPassword: Yup
      .string()
      .required()
      .label('Confirm password')
      .test('passwords-match', 'Passwords must match ya fool', function(value) {
        return this.parent.password === value;
      }),
  }),

  handleSubmit: (
    values,
    { props, setSubmitting, setErrors, resetForm, setValues, setTouched }
  ) => {

    const a = props.mutation({
      variables:
      {
        name: values.name,
        email: values.email,
        // password: values.password,
      },
    })
  },
})(ProfileScreenForm)