import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import AwesomeInput from '../components/AwesomeInput';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import LoginButton from '../components/LoginButton';

type RegisterFormScreenProps = {
  navigation: NavigationScreenProp<any, any>,
  mutation: any,
};

type RegisterFormScreenState = {};

type RegisterScreenFormProps = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

type MixedProps = RegisterFormScreenProps & RegisterScreenFormProps & FormikProps<RegisterScreenFormProps>

class RegisterFormScreen extends PureComponent<MixedProps, RegisterFormScreenState> {
  static navigationOptions = {
    title: 'Criar conta',
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
          <AwesomeInput
            label="Nome"
            color={color.BLUE}
            onChange={(text) => this.props.setFieldValue('name', text)}
            value={this.props.name}
          />

          <AwesomeInput
            label="E-mail"
            color={color.BLUE}
            onChange={(text) => this.props.setFieldValue('email', text)}
            value={this.props.email}
          />

          <AwesomeInput
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
          />
          <View style={{ height: 80 }} />
        </ScrollView>

        <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <LoginButton label="Cadastrar" action={() => {
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

export default withFormik<any, RegisterScreenFormProps>({
  mapPropsToValues: () => ({ name: '', email: '', password: '', confirmPassword: '' }),

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
      .test('passwords-match', 'Passwords must match ya fool', function (value) {
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
        password: values.password,
      },
    })
  },
})(RegisterFormScreen)