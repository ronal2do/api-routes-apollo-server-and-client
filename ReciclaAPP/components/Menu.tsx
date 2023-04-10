import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { theme as colors } from '../constants/Colors';

type MenuProps = {
  variant?: boolean;
}

const Menu = ({ variant = false }: MenuProps) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity style={styles.wrapper} 
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) }
      hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
    >
      <View>
        <Image
          source={require('../assets/images/menu.png')}
          style={[
            styles.icon,
            { tintColor: variant ? colors.BLUE : 'white' }
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  wrapper: { 
    marginLeft: 20,
  }
});

export default Menu;
