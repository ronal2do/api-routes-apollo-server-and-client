import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import AwesomeInput from '../components/AwesomeInput';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import LoginButton from '../components/LoginButton';
import Typography from '../components/Typography';

type RegisterFormScreenProps = {
  navigation: NavigationScreenProp<any, any>,
  mutation: any,
};

type RegisterFormScreenState = { };

type RegisterScreenFormProps = {
  password: string,
  confirmPassword: string,
}

type MixedProps = RegisterFormScreenProps & RegisterScreenFormProps & FormikProps<RegisterScreenFormProps>

class RegisterFormScreen extends PureComponent<MixedProps, RegisterFormScreenState> {
  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={{ alignItems: 'flex-start' }}>
            <Typography color={color.BLUE} kind="instructions">
              Insira a nova senha
            </Typography>
          </View>
          <AwesomeInput
            label="Nova senha"
            secureTextEntry={true}
            color={color.BLUE}
            onChange={(text) => this.props.setFieldValue('password', text)}
            value={this.props.password}
          />
          {this.props.errors.password && this.props.touched.password &&
            <Typography color={color.RED} kind="error">
              {this.props.errors.password || ''}
            </Typography>
          }
          <AwesomeInput
            label="Confirmar senha"
            color={color.BLUE}
            secureTextEntry={true}
            onChange={(text) => this.props.setFieldValue('confirmPassword', text)}
            value={this.props.confirmPassword}
          />
          <View style={{ height: 80 }}/>
          {this.props.errors.confirmPassword && this.props.touched.confirmPassword &&
            <Typography color={color.RED} kind="error">
              {this.props.errors.confirmPassword || ''}
            </Typography>
          }
        </ScrollView>

        <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white' }}>
           <LoginButton label="Recuperar" action={() => {
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
  mapPropsToValues: () => ({ password: '', confirmPassword: '' }),

  validationSchema: Yup.object().shape({
    password: Yup
      .string()
      .min(4, 'A senha deve ter no mínimo 4 caracteres')
      .required('Preencha o campo de Senha'),
    confirmPassword: Yup
      .string()
      .required()
      .label('Confirm password')
      .test('passwords-match', 'Passwords must match ya fool', function(value) {
        return this.parent.password === value;
      }),
  }),

  handleSubmit: async (
    values,
    { props, setError }
  ) => {
    console.log('@@ props token ', props)
    await props.mutation({
      variables:
      {
        token: props.token,
        password: values.password,
      },
    }).then( console.log )    
  },
})(RegisterFormScreen)