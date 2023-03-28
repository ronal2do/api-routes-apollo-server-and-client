import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { PROFILE_QUERY } from '../graphql/queries';
import { Query } from 'react-apollo';
import { NavigationScreenProp } from 'react-navigation';
import { theme } from '../constants/Colors';
import Typography from './Typography';
import { generateInitials } from '../utils';

type MeProps = {
  navigation: NavigationScreenProp<any, any>
} 

const Me = (props: MeProps) => (
  <Query query={PROFILE_QUERY}>
    {({ loading, data, error }: any) => {
      if (loading) {
        return <ActivityIndicator style={{ marginRight: 15 }}/>
      }
      if (error) {
        return <View />
      }
      if (data.me == null) {
        return <ActivityIndicator style={{ marginRight: 15 }}/>
      }
      const { me } = data;
      return (
        <TouchableOpacity 
          style={{ marginRight: 15 }} onPress={() => props.navigation.navigate('Profile', { me })} 
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        >
          <View>
          {me.picture ?
            <Image
              source={{uri: me.picture}}
              style={styles.icon}
            /> : 
            <View style={[styles.icon, { justifyContent: 'center', alignItems: 'center', backgroundColor: theme.GREEN }]}>
              <Typography kind="instructions" color={theme.BLUE} style={{ padding: 0, marginTop: 3, fontWeight: "600" }}>{generateInitials(me.name)}</Typography>
            </View>
          }
          </View>
        </TouchableOpacity>
      )
    }} 
  </Query>
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  }
});

export default withNavigation(Me);
