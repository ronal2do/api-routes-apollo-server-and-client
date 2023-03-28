import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class PageFooter extends React.PureComponent<{}, {}> {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/Logo-black.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: 30,
    paddingTop: 20
  }
});
