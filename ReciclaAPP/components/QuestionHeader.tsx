import React, { PureComponent } from 'react'
import { ImageBackground, StyleSheet, View, Platform } from 'react-native'
import Typography from './Typography'
import { theme as color } from '../constants/Colors'
import AnimatedNumber from './AnimatedNumber';

export default class QuestionHeader extends PureComponent<{ label: string, answer: number | null | undefined, points: any }> {
  render() {
    const { label, answer } = this.props;
    console.log('question header props', this.props)
    const defineLabel = label.length < 120 ? 'welcome' : 'title'
    return (
      <ImageBackground style={styles.header} imageStyle={styles.backImage} resizeMode="contain" source={require('../assets/images/stars02.png')}>
        <Typography kind={defineLabel} color="#fff" style={{ textAlign: 'center' }}>
          {label}
        </Typography>
        <View style={styles.points}>
          <AnimatedNumber kind={'welcome'} value={parseInt(this.props.points)} color={color.GREEN} timing="linear" />
          <Typography kind={'welcome'} color={color.GREEN}> pontos</Typography>
        </View>
        {__DEV__ && answer != null && <Typography kind="instructions" color="gray">Resposta correta: {`${answer}`}</Typography>}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '80%',
    alignItems: 'center',
  },
  backImage: {
    marginTop: 46,
    marginBottom: 0,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  points: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: Platform.OS === 'ios' ? 'baseline' : 'center'
  }
});
