import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity, Switch } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import Typography from '../components/Typography'
import { theme as color } from '../constants/Colors';

type SettingsRowProps = {
  onPress: () => void;
  label: string;
  textStyle?: any;
  isSwitch?: boolean;
  switchValue?: any;
};

export default class SettingsRow extends PureComponent<SettingsRowProps> {
  render() {
    const { onPress, label, textStyle, switchValue, isSwitch } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.optionButton}>
          <Typography kind="instructions" style={textStyle}>{label}</Typography>
          
          {isSwitch ? 
            <Switch
              thumbColor={color.BLUE}
              trackColor={{ false: color.GRAY, true: color.CYAN }}
              style={{ alignSelf: 'center' }}
              onValueChange={onPress}
              value={switchValue}
            /> 
            :<FontAwesome
              style={{ alignSelf: 'center' }}
              color={color.BLUE}
              size={14}
              name={'chevron-right'}/>
            }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  optionButton: {
    paddingTop: 25,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.GRAY,
    flexDirection: 'row',
  }
})
