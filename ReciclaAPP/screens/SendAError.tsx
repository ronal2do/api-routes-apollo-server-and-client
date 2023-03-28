import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import Typography from '../components/Typography'
import PageFooter from '../components/PageFooter';
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';

type LicencesScreenProps = {
  navigation: NavigationScreenProp<any, any>
};

export default class LicencesScreen extends PureComponent<LicencesScreenProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Reportar erro',
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
      },
      headerTintColor: color.BLUE,
    }
  }


  render() {
    return (
      <>
        <View style={styles.container}>
          <Typography kind="welcome">Reportar erro</Typography>
          {/* <View style={styles.optionButton}><Typography kind="instructions">Versão do APP: {String(Constants!.manifest!.version || 0)}</Typography></View> */}
        </View>
        <PageFooter />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 30,
  },
  optionButton: {
    paddingTop: 35,
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: color.GRAY,
    flexDirection: 'row',
  }
})
