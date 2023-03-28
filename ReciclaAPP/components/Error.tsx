import React, { PureComponent } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import Typography from './Typography'

export default class Error extends PureComponent<{ text: string }> {
  render() {
    const { text } = this.props;
    return (
      <ImageBackground style={styles.header} imageStyle={styles.backImage} resizeMode="contain" source={require('../assets/images/stars01.png')}>
        <Typography kind="instructions" color="#fff" style={{ textAlign: 'center' }}>
          {text}
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
