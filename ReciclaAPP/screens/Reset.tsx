import React, { PureComponent } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { FormikProps } from 'formik';
import { Mutation } from 'react-apollo'
import ResetForm from './ResetForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { RESET_PASSWORD } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';
import Analytics from '../services/Analytics';

type ResetScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any, mutation: any } & FormikProps<ResetScreenProps>

export default class ResetScreen extends PureComponent<MixedProps, {}> {
  static navigationOptions = {
    title: 'Nova senha',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  _signInAsync = async (data: any) => {
    const { UserResetPassword : {error, token, id, email } } = data;
    if  (error) {
      return Alert.alert(
        'Oops!',
          errorsToHumans(error),
        [
          {text: 'Gerar novo', onPress: () => console.log('OK Pressed')},
          {text: 'Cancelar', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    }
    await AsyncStorage.setItem(APP_KEYS.LOGIN, token);
    let trackingOpts = {
      id,
      usernameOrEmail: email,
    };

    Analytics.track(Analytics.events.USER_RESET_PASSWORD, trackingOpts);

    return this.props.navigation.navigate('App')
  };

  render() {
    const token = this.props.navigation.getParam('token', null)

    return (
      <Mutation mutation={RESET_PASSWORD} onCompleted={(data: any) => this._signInAsync(data)}>
        {(mutation: any) => <ResetForm navigation={this.props.navigation} mutation={mutation} token={token}/>}
      </Mutation>
    );
  }
}
