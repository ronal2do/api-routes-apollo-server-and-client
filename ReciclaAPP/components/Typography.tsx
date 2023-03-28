import React, { PureComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import { theme } from '../constants/Colors';

export type TypographyStyle =
  | 'welcome'
  | 'big'
  | 'max'
  | 'title'
  | 'titleSmall'
  | 'instructions'
  | 'error'
  | 'small';

type TypographyProps = {
  children?: any;
  kind: TypographyStyle;
  color?: string;
  style?: any;
}

export default class Typography extends PureComponent<TypographyProps> {
  render() {
    const {
      children,
      kind,
      color,
      style,
    } = this.props;

    return <Text style={[styles[kind], { color }, style]}>{children}</Text>
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 22,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  big: {
    fontSize: 35,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  max: {
    fontSize: 55,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '700', 
    paddingVertical: 15
  },
  titleSmall: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '700', 
    paddingVertical: 15
  },
  instructions: {
    textAlign: 'left',
    marginBottom: 5,
  },
  small: {
    fontSize: 10,
    textAlign: 'left',
  },
  error: {
    fontSize: 10,
    textAlign: 'left',
  }
})