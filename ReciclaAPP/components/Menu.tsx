import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { theme as colors } from '../constants/Colors';
import { withNavigation } from 'react-navigation';

type MenuProps = {
  variant?: boolean;
}

type NavigationProps = {
  navigation: {
    toggleDrawer: () => void;
  }
}

const Menu = ({ navigation, variant = false }: any) => (
  <TouchableOpacity style={{ marginLeft: 20 }} 
    onPress={() => navigation.toggleDrawer()}
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

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  }
});
export default withNavigation(Menu);
