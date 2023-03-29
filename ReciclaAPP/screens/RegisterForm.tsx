import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { theme as color } from '../constants/Colors';
import AwesomeInput from '../components/AwesomeInput';
import LoginButton from '../components/LoginButton';

const RegisterFormScreen = ({ mutation }: any) => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const handleSubmit = async () => {
    const variables = {
      name,
      email,
      password
    }

    try {
      mutation({
        variables
      })
    } catch (err) {
      console.log('-== register', err)
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <AwesomeInput
          label="Nome"
          color={color.BLUE}
          onChange={(text) => setName(text)}
          value={name}
        />

        <AwesomeInput
          label="E-mail"
          color={color.BLUE}
          onChange={(text) => setEmail(text)}
          value={email}
        />

        <AwesomeInput
          label="Senha"
          secureTextEntry={true}
          color={color.BLUE}
          onChange={(text) => setPassword(text)}
          value={password}
        />
        <AwesomeInput
          label="Confirmar senha"
          color={color.BLUE}
          secureTextEntry={true}
          onChange={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <LoginButton label="Cadastrar" action={() => {
          handleSubmit()
        }} />
      </View>

    </>
  )
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

export default RegisterFormScreen;
