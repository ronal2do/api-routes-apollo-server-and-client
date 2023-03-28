import React, { PureComponent } from 'react'
import { ThemedButton  } from 'react-native-really-awesome-button'
import { theme as color } from '../constants/Colors';
import { Dimensions } from 'react-native';
const sWidth = Dimensions.get('screen').width;

type ButtonProps = {
  width?: number;
  label: string;
  backgroundColor: string;
  onPress: () => void;
  disabled?: boolean;
  raiseLevel?: number;
  timer?: number;
  progress?: any;
  textColor?: string | undefined;
}
export default class Button extends PureComponent<ButtonProps> {
  render() {
    const {
      label,
      backgroundColor,
      onPress,
      disabled = false,
      raiseLevel = 0,
      timer = 100,
      progress,
      width,
      textColor = color.BLUE,
      ...rest
    } = this.props;

    return (
      <ThemedButton   
        size="medium"
        style={{ marginBottom: 15 }}
        type="primary"
        name="bojack"
        width={width ? width : sWidth - 40}
        backgroundDarker={backgroundColor}
        backgroundColor={backgroundColor}
        backgroundProgress={backgroundColor}
        progress={progress}
        raiseLevel={raiseLevel}
        disabled={disabled}
        textColor={textColor}
        onPress={async (next) => {
          await onPress();
          next && next();
        }}
        {...rest}
      >{label}</ThemedButton  >
    )
  }
}
