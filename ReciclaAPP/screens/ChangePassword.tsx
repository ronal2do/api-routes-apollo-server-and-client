import React, { PureComponent } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { FormikProps } from 'formik';
import { Mutation } from 'react-apollo'
import ChangePasswordForm from './ChangePasswordForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { CHANGE_PASSWORD } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';

type ChangePasswordScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any, mutation: any } & FormikProps<ChangePasswordScreenProps>

export default class ChangePasswordScreen extends PureComponent<MixedProps, {}> {
  static navigationOptions = {
    title: 'Alterar senha',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  _signInAsync = async (data: any) => {
    const { UserChangePassword : { error } } = data;
    if  (error) {
      return Alert.alert(
        'Oops!',
          errorsToHumans(error),
        [
          {text: 'Ok', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    }

    return this.props.navigation.goBack()
  };

  render() {
    return (
      <Mutation mutation={CHANGE_PASSWORD} onCompleted={(data: any) => this._signInAsync(data)}>
        {(mutation: any) => <ChangePasswordForm navigation={this.props.navigation} mutation={mutation} />}
      </Mutation>
    );
  }
}
