import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { theme as color } from '../constants/Colors';
import AwesomeInput from './AwesomeInput';
import { withFormik, FormikProps } from 'formik';
import LoginButton from './LoginButton';
import { validateCPF } from '../utils';
import Typography from './Typography';

type CpfFormScreenProps = {
  mutation: any,
};

type CpfFormScreenState = { };

type CpfFormProps = {
  cpf: string,
}

export const cpfMask = (value: any) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

type MixedProps = CpfFormScreenProps & CpfFormProps & FormikProps<CpfFormProps>

class CpfFormScreen extends PureComponent<MixedProps, CpfFormScreenState> {
  render() {
    return (
      <>
      <View style={styles.inputContainer}>
        <AwesomeInput
          label={'CPF'}
          name="cpf"
          cpfMask={true}
          color={color.BLUE}
          style={{ flex: 1, marginBottom: 30, marginRight: 10 }}
          keyboardType="numeric"
          onChange={(text) => {
            this.props.setFieldValue('cpf', text)}
          }
          value={this.props.values.cpf}
        />
        <LoginButton
          disabled={!validateCPF(this.props.values.cpf)}
          width={110}
          label='Enviar'
          action={() => this.props.handleSubmit()}
        />
      </View>
      <View style={{ paddingHorizontal: 30 }}>
        {this.props.errors.cpf && this.props.touched && 
          <Typography color={color.RED} kind="error">
            {this.props.errors.cpf}
          </Typography>
        }
      </View>
     </>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30
  }
})

export default withFormik<any, CpfFormProps>({
  mapPropsToValues: () => ({ cpf: '' }),

  validate: (values, props) => {
    const { cpf } = values
    const errors: any = {}

    if (!cpf) {
      errors.cpf = 'Este campo não poder estar em branco';
    } else if ( !validateCPF(cpf) ) {
      errors.cpf = 'Informe um CPF válido'
    }

    return errors
  },

  handleSubmit: (
    values,
    { props }
  ) => {
    props.mutation({variables: { cpf: values.cpf },})
  },
})(CpfFormScreen)