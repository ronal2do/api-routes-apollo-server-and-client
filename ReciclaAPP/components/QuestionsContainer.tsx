
import React from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, ScrollView } from 'react-native';
import { theme as color } from '../constants/Colors';
import Button from './Button';

type QuestionsContainerProps = {
  header: React.ReactNode;
  body: React.ReactNode;
  label: string;
  onPress: () => void;
}

export default class QuestionsContainer extends React.PureComponent<QuestionsContainerProps> {
  render() {
    return (
      <> 
        <ScrollView>
          <View style={styles.header}>
            {this.props.header}
          </View>
          <View style={styles.container}>
            {this.props.body != null ? this.props.body : <ActivityIndicator/>}
          </View>
        </ScrollView>
        <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <Button
            backgroundColor={color.GREEN}
            raiseLevel={0}
            textColor="white"
            label={this.props.label}
            onPress={this.props.onPress}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 237 : 187,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.BLUE,
    padding: 30,
  },
  stars: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    margin: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 15,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    width: 200,
    textAlign: 'left',
    color: '#fff',
  },
});
