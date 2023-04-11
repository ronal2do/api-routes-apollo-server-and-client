import React, { PropsWithChildren, useLayoutEffect } from 'react'
import { View, StatusBar } from 'react-native'
import Close from './Close'
import { useNavigation } from '@react-navigation/native'
import Menu from './Menu'
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface NavigationWrapperProps {
  drawer?: boolean;
  variant?: boolean;
  backgroundColor?: string;
}

export const NavigationWrapper = ({ children, drawer, variant, backgroundColor }: PropsWithChildren<NavigationWrapperProps>) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  
  return (
    <View style={{ 
        flex: 1, 
        backgroundColor: backgroundColor || 'white',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <StatusBar barStyle={variant ? 'dark-content': 'light-content'} />
      <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', padding: 2 }}>
        {drawer ? <Menu variant={variant} /> : <Close variant={variant} />}
      </View>
      {children}
    </View>
  )
}