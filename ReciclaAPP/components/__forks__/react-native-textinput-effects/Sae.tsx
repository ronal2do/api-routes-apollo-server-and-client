import React, { PureComponent, createRef }  from 'react';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform,
} from 'react-native';

type BaseInputProps = {
  label?: string,
  value?: string,
  defaultValue?: string,
  secureTextEntry?: boolean,
  style?: any,
  inputStyle?: any,
  labelStyle?: any,
  easing?: (...args: any[]) => any,
  animationDuration?: number,
  useNativeDriver?: boolean,
  editable?: boolean,
  onBlur?: (...args: any[]) => any,
  onFocus?: (...args: any[]) => any,
  onChange?: (...args: any[]) => any,
  cpfMask?: boolean,
  autoFocus?: boolean 
};

type SaeProps = BaseInputProps & {
  height: number,
  borderHeight?: number,
  inputPadding: number,
  labelHeight: number,
}

type BaseInputState = {
  value?: string,
  focusedAnim: Animated.Value,
  width: number
};

export const cpfMask = (value: any) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}
export default class Sae extends PureComponent<SaeProps, BaseInputState> {
  static defaultProps = {
    iconColor: 'white',
    height: 48,
    inputPadding: 16,
    labelHeight: 20,
    borderHeight: 2,
    animationDuration: 300,
    cpfMask: false
  };

  private isActive: boolean = false;
  private input: any = createRef<TextInput>()

  state = {
    value: this.props.value || '',
    focusedAnim: new Animated.Value(this.props.value ? 1 : 0),
    width: 0,
  };

  componentWillReceiveProps(newProps: SaeProps) {
    const newValue = newProps.value;
    if (newValue != null && newValue !== this.state.value) {
      // this.setState({
      //   value: newValue,
      // });
      const isFocused = this.input.current!.isFocused();
      
      if (!isFocused) {
        const isActive = Boolean(newValue);

        if (isActive !== this.isActive) {
          this._toggle(isActive);
        }

      }
    }
  }

  _onLayout = (event: any): void => {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  }

  // _onChange = (event: NativeSyntheticEvent<TextInputChangeEventData>): void => {
  _onChange = (text: any): void => {
    // const nt = `NN - ${text}`
// cpfMask
    const newText = this.props.cpfMask === true ? cpfMask(text) : text
    
    this.setState({
      value: newText,
    });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(newText);
    }
  }

  _onBlur = (event: any) => {
    if (!this.state.value) {
      this._toggle(false);
    }

    const {onBlur} = this.props;
    if (onBlur) {
      onBlur(event);
    }
  }

  _onFocus = (event: any) => {
    this._toggle(true);

    const {onFocus} = this.props;
    if (onFocus) {
      onFocus(event);
    }
  }

  _toggle = (isActive: boolean) => {
    const { animationDuration, easing, useNativeDriver } = this.props;
    this.isActive = isActive;
    Animated.timing(this.state.focusedAnim, {
      toValue: isActive ? 1 : 0,
      duration: animationDuration,
      easing,
      useNativeDriver,
    }).start();
  }

  // public methods
  focus = () => {
    if (this.props.editable !== false) {
      this.input.current!.focus();
    }
  }

  blur = () => {
    this.input.current!.blur();
  }

  isFocused = () => this.input.current!.isFocused();
  
  clear(){ 
    this.input.current!.clear();
  }

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      inputPadding,
      labelHeight,
      borderHeight,
      inputStyle,
      labelStyle,
      secureTextEntry,
      cpfMask,
      autoFocus,
    } = this.props;
    const { width, focusedAnim, value } = this.state;

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + inputPadding,
          },
        ]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, labelHeight + inputPadding],
              }),
            }}
          >
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  paddingBottom: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ]}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref={this.input}
          {...this.props}
          keyboardType={Platform.OS === 'ios' ? 'email-address' : "default"}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
              paddingTop: inputPadding / 2,
            },
          ]}
          value={value && String(value)}
          onBlur={this._onBlur}
          onChangeText={this._onChange}
          autoCapitalize='none'
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
          secureTextEntry={secureTextEntry}
        />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: borderHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              // outputRange: [0, width],
              outputRange: [width, width],
            }),
            backgroundColor: 'gray',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  label: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: '#7771ab',
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 0,
    color: 'white',
    fontSize: 18,
  },
});