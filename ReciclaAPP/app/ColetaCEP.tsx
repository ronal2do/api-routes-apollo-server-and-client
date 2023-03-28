import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Typography from '../components/Typography';
import { theme as color } from '../constants/Colors';
import AwesomeInput from '../components/AwesomeInput';
import LoginButton from '../components/LoginButton';
import Menu from '../components/Menu';
import Me from '../components/Me';

const RESULT: any = {
  street: 'nome da rua, 000 - Nome do bairro - Cidade.',
  days: ['Segundas-feiras 14h', 'Quartas-feiras 14h'],
};

export default function ContactScreen() {
  const [cep, setCep] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (cep.trim().length === 0) {
      return;
    }

    setResult(RESULT);
  };

  const handleClear = () => {
    setResult(null);
    setCep('');
  };

  return (
    <>
      <View style={styles.header}>
        <Typography kind="welcome" color="#fff">
          Digite seu CEP para consultar
        </Typography>

        <View style={styles.inputContainer}>
          <AwesomeInput
            label={'Cep'}
            value={cep}
            onChange={(text) => setCep(text.replace(/\D/g, ''))}
            color="#fff"
            style={styles.input}
            keyboardType="numeric"
          />
          <LoginButton
            width={110}
            label={result === null ? 'Pesquisar' : 'Limpar'}
            action={result === null ? handleSearch : handleClear}
          />
        </View>

        {result && (
          <>
            <View>
              <Typography color="#fff" kind="instructions">
                {RESULT.street}
              </Typography>
            </View>

            <View>
              <Typography color="#fff" kind="instructions">
                Coleta
              </Typography>
              {RESULT.days.map((day: any, index: any) => (
                <Typography color="#fff" key={index} kind="welcome">
                  {day}
                </Typography>
              ))}
            </View>
          </>
        )}
      </View>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/truck.png')} />
      </View>
    </>
  );
}

ContactScreen.navigationOptions = () => {
  return {
    title: 'Coleta',
    headerStyle: {
      backgroundColor: color.RED,
      borderBottomWidth: 0,
    },
    headerLeft: <Menu />,
    headerRight: <Me />,
  };
};

const styles = StyleSheet.create({
  header: {
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    marginBottom: 30,
    marginRight: 10,
  },
});
