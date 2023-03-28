import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import AwesomeInput from '../components/AwesomeInput';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import LoginButton from '../components/LoginButton';
import Typography from '../components/Typography';

type ForgetFormScreenProps = {
  navigation: NavigationScreenProp<any, any>,
  mutation: any,
};

type ForgetFormScreenState = { };

type ForgetScreenFormProps = {
  email: string,
}

type MixedProps = ForgetFormScreenProps & ForgetScreenFormProps & FormikProps<ForgetScreenFormProps>

class ForgetFormScreen extends PureComponent<MixedProps, ForgetFormScreenState> {
  render() {
    return (
      <>
        <ScrollView style={styles.container}>
        {/* {!!showImage && ( */}
            <View style={{ alignItems: 'flex-start' }}>
              {/* <Typography color={color.BLUE} kind="welcome">
                Bem-vindo ao ReciclaAPP
              </Typography> */}
              <Typography color={color.BLUE} kind="instructions">
                Em alguns instantes você recebera um e-mail informando como proceder
              </Typography>
            </View>
          {/* )} */}
          <AwesomeInput
            label="Informe o seu e-mail"
            color={color.BLUE}
            onChange={(text) => this.props.setFieldValue('email', text)}
            value={this.props.email}
          />
          {this.props.errors.email && this.props.touched.email &&
            <Typography color={color.RED} kind="error">
              {this.props.errors.email || ''}
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

export default withFormik<any, ForgetScreenFormProps>({
  mapPropsToValues: () => ({ email: '' }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('O e-mail deve ser válido !')
      .required('Preencha o campo de e-mail'),
  }),

  handleSubmit: async (
    values,
    { props, setError }
  ) => {
    console.log('@@ props token ', props)
    await props.mutation({
      variables:
      {
        email: values.email,
      },
    }).then( console.log )
  },
})(ForgetFormScreen)