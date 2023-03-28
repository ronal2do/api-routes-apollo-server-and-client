import React, { PureComponent, ReactText } from 'react'
import { ImageBackground, StyleSheet, ActivityIndicator, View } from 'react-native'
import { theme as color } from '../constants/Colors'
import Typography from './Typography'
import { Query } from 'react-apollo';
import { PROFILE_QUERY } from '../graphql/queries';

const Points = () => (
  <Query query={PROFILE_QUERY}>
    {({ client, loading, data, error }: any) => {
      if (loading) {
        return <ActivityIndicator/>
      }
      if (error) {
        return <View />
      }
      const { me } = data;
      const points = me.points.points
      return (
        <Typography kind="instructions" color="#fff" style={{ textAlign: 'center' }}>Saldo de pontos atual: {points | 0} pontos</Typography>
      )
    }} 
  </Query>
);
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



// import { TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
// import { PROFILE_QUERY } from '../graphql/queries';
// import { Query } from 'react-apollo';
// import { NavigationScreenProp } from 'react-navigation';
