import React from 'react';
import Button from './Button';
import { theme } from '../constants/Colors';

type LoginButtonProps = {
  width?: number;
  disabled?: boolean;
  label: string;
  action: () => any;
}

const LoginButton = ({ label, disabled, action, width }: LoginButtonProps) => (
  <Button
    backgroundColor={!disabled ? theme.GREEN : '#D1D6D9'}
    progress
    disabled={disabled}
    onPress={action}
    label={label}
    raiseLevel={0}
    width={width}
  />
);

export default LoginButton;
