import React, { PropsWithChildren, useLayoutEffect } from 'react'
import { SafeAreaView, View, StatusBar } from 'react-native'
import Close from './Close'
import { useNavigation } from '@react-navigation/native'
import Menu from './Menu'

interface NavigationWrapperProps {
  drawer?: boolean;
  variant?: boolean;
  backgroundColor?: string;
}

export const NavigationWrapper = ({ children, drawer, variant, backgroundColor }: PropsWithChildren<NavigationWrapperProps>) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor || 'white' }}>
      <StatusBar barStyle={variant ? 'dark-content': 'light-content'} />
      <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', padding: 2 }}>
        {drawer ? <Menu variant={variant} /> : <Close variant={variant} />}
      </View>
      {children}
    </SafeAreaView>
  )
}