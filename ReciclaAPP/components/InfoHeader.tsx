import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { theme as color } from '../constants/Colors'
import Typography from './Typography'
import AnimatedNumber from './AnimatedNumber';

type InfoHeaderProps = { points: string };

export default function InfoHeader({ points }: InfoHeaderProps) {
  return (
    <ImageBackground style={styles.header} imageStyle={styles.backImage} resizeMode="contain" source={require('../assets/images/stars02.png')}>
      <Typography kind="instructions" color="#fff" style={{ textAlign: 'center' }}>
        Leia atentamente pois a próxima pergunta vale
      </Typography>
      <AnimatedNumber value={parseInt(points)} color={color.GREEN} timing="linear" />
      <Typography kind="welcome" color={color.GREEN}>pontos</Typography>
    </ImageBackground>
  )
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
