import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import Typography from '../components/Typography'
import PageFooter from '../components/PageFooter';
import { theme as color } from '../constants/Colors';
import { NavigationScreenProp } from 'react-navigation';
import FeedbackForm from './FeedbackForm';

type FeedbackScreenProps = {
  navigation: NavigationScreenProp<any, any>
};

export default class FeedbackScreen extends PureComponent<FeedbackScreenProps> {
  static navigationOptions = {
    title: 'Feedback',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }


  render() {
    return (
      <>
        <View style={styles.container}>
          <Typography kind="welcome">Feedback</Typography>
          {/* <FeedbackForm onFinish={() => console.log('on finish')} submit={() => console.log('on submit')}/>} */}
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
