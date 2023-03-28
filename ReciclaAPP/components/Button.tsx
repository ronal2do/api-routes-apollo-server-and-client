import React, { PureComponent } from 'react'
import AwesomeButton from 'react-native-really-awesome-button/src/themes/bojack'
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
      <AwesomeButton size="medium"
        style={{ marginBottom: 15 }}
        type="primary"
        width={width ? width : sWidth - 40}
        backgroundDarker={backgroundColor}
        backgroundColor={backgroundColor}
        backgroundProgress={backgroundColor}
        progress={progress}
        raiseLevel={raiseLevel}
        disabled={disabled}
        textColor={textColor}
        onPress={(next: () => void) =>
          setTimeout(() => {
            onPress()
            next()
          }, timer)
        }
        {...rest}
      >{label}</AwesomeButton>
    )
  }
}
