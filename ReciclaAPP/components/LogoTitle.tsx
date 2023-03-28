import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'

export class LogoTitle extends PureComponent {
  render() {
    return (
      <View>
        <Image
          style={{ width: 85, height: 20 }}
          source={require('../assets/images/Brand.png')}
        />
      </View>
    )
  }
}

export default LogoTitle
