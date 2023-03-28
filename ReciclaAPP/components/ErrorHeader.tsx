import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from './Typography';
import { theme as color } from '../constants/Colors';

export default class ErrorHeader extends PureComponent {
  render() {
    return (
      <View style={styles.header}>
        <Typography kind="welcome" color={color.RED} style={{ textAlign: 'center' }}>
          Ah que pena!
        </Typography>
        <Typography kind="instructions" color="#fff" style={{ textAlign: 'center' }}>
          Você não ganhou pontos 
        </Typography>
        <Typography kind="instructions" color="#fff" style={{ textAlign: 'center' }}>
          Essa pergunta pode voltar a aparecer, pesquise a resposta correta.
        </Typography>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: 237,
    alignItems: 'center',
  },
  backImage: {
    marginTop: 46,
    marginBottom: 0,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
