import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import Typography from '../components/Typography';
import { theme as color } from '../constants/Colors';
import { NavigationWrapper } from '../components/NavigationWrapper';

export default class ContactScreen extends React.PureComponent<{}, {}> {
  render() {
    return (
      <NavigationWrapper drawer={true} variant={true} backgroundColor={color.CYAN}>
        <View style={styles.container}>
          <Typography color="#FFF" kind="welcome">
            Confira o percentual de separação de recicláveis.{' '}
          </Typography>
          <Typography color="#FFF" kind="instructions">
            Não se esqueça que é você quem faz o reciclômetro aumentar, não deixe de separar seu lixo.
          </Typography>
        </View>

        <View style={styles.containerMiddle}>
          <Image source={require('../assets/images/reciclometro.png')} />
        </View>

        {Platform.OS === 'ios' && (
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/reciclagem.png')} />
          </View>
        )}
      </NavigationWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: color.CYAN,
    padding: 30
  },
  containerMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.CYAN
  },
  logoContainer: {
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.CYAN
  }
});
