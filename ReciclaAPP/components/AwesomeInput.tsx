import React from 'react';
import { Sae } from './__forks__/react-native-textinput-effects';
import { theme as ThemeColor } from '../constants/Colors';
import { ViewStyle } from 'react-native';

type AwesomeInputProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  color?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  keyboardType?: any;
  name?: string;
  ref?: any;
  cpfMask?: boolean;
  autoFocus?: boolean;
}

const AwesomeInput = React.forwardRef((props: AwesomeInputProps, ref ) => {
  const {
    label,
    value,
    onChange,
    color = ThemeColor.BLUE,
    secureTextEntry = false,
    style = {},
    autoFocus = false,
    ...rest
  } = props;
  return (
    <Sae
      label={label}
      ref={ref}
      iconColor={color}
      inputPadding={16}
      labelHeight={24}
      useNativeDriver={false}
      borderHeight={1}
      onChange={onChange}
      value={value}
      inputStyle={{ color: color }}
      labelStyle={{ color: color }}
      secureTextEntry={secureTextEntry}
      style={style}
      autoFocus={autoFocus}
      {...rest}
    />)
  });
    
 
export default AwesomeInput;
