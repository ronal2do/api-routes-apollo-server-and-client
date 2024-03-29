import React, { PureComponent, ReactText } from 'react'
import { ImageBackground, StyleSheet, ActivityIndicator, View } from 'react-native'
import { theme as color } from '../constants/Colors'
import Typography from './Typography'
import { PROFILE_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const Points = () => {
  const { loading, data, error } = useQuery(PROFILE_QUERY)
  if (loading) {
    return <ActivityIndicator/>
  }
  if (error) {
    return <View />
  }
  const { me } = data;
  const points = me.points
  return (
    <Typography kind="instructions" color="#fff" style={{ textAlign: 'center' }}>Saldo de pontos atual: {points | 0} pontos</Typography>
  )
};

export default class SuccessHeader extends PureComponent<{ points: ReactText }> {
  render() {
    return (
      <ImageBackground style={styles.header} imageStyle={styles.backImage} resizeMode="contain" source={require('../assets/images/stars02.png')}>
        <Typography kind="instructions" color="#fff" style={{ textAlign: 'center' }}>
          Parabéns você acumulou mais
        </Typography>
        <Typography kind="max" color={color.GREEN}>{this.props.points}</Typography>
        <Typography kind="welcome" color={color.GREEN}>pontos</Typography>
        <Points />
      </ImageBackground>
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
