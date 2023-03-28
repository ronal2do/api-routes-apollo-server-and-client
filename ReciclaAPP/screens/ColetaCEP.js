import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';
import AwesomeInput from '../components/AwesomeInput'
import LoginButton from '../components/LoginButton'
import Menu from '../components/Menu'
import Me from '../components/Me';

const RESULT = {
  street: 'nome da rua, 000 - Nome do bairro - Cidade.',
  days: [
    'Segundas-feiras 14h',
    'Quartas-feiras 14h'
  ]
}


export default class ContactScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Coleta',
      headerStyle: {
        backgroundColor: color.RED,
        borderBottomWidth: 0,
      },
      headerLeft: <Menu />,
      headerRight: <Me />
    }
  }

  state = { cep: null, result: null }

  render() {
    const { cep, result } = this.state
    return (
      <>
        <View style={styles.container}>
          <Typography kind="welcome" color="#fff">Digite seu CEP para consultar</Typography>

          <View style={styles.inputContainer}>
            <AwesomeInput
              label={'Cep'}
              onChangeTypography={text => this.setState({ cep: text.replace(/\D/g, ''), })}
              value={cep}
              color="#fff"
              style={{ flex: 1, marginBottom: 30, marginRight: 10 }}
              keyboardType='numeric'
            />
            <LoginButton
              width={110}
              label={result === null ? "Pesquisar" : "Limpar"}
              action={() => {
                if (result === null) {
                  return this.setState({ result: RESULT })
                }
                return this.setState({ result: null, cep: null })
              }}
            />
          </View>

          {result !== null &&
            <>
              <View>
                <Typography color="#fff" kind="instructions">{RESULT.street}</Typography>
              </View>

              <View>
                <Typography color="#fff" kind="instructions">Coleta</Typography>
                {RESULT.days.map((day, index) => <Typography color="#fff" key={index} kind="welcome">{day}</Typography>)}
              </View>
            </>
          }
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/truck.png')} />
        </View>

      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: color.RED,
    padding: 30,
  },
  logoContainer: {
    height: 105,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: color.RED,
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
})
