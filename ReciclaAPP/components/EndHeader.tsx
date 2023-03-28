import React, { PureComponent } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Typography from './Typography';

export default class EndHeader extends PureComponent {
  render() {
    return (
      <ImageBackground style={styles.header} imageStyle={styles.backImage} resizeMode="cover" source={require('../assets/images/stars02.png')}>
        <Typography kind="welcome" color="#fff" style={{ textAlign: 'center', paddingVertical: 40 }}>
          Parabéns!
        </Typography>
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
