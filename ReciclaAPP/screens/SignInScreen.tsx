import React, { PureComponent } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { FormikProps } from 'formik';
import { Mutation } from 'react-apollo'
import SignInScreenForm from './SignInScreenForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';
import Analytics, { TrackingOpts } from '../services/Analytics';

type SignInScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any, mutation: any } & FormikProps<SignInScreenProps>

export default class SignInScreen extends PureComponent<MixedProps, {}> {
  static navigationOptions = {
    header: null
  }

  _signInAsync = async (data: any) => {
    const { UserLoginWithEmail : {error, token, id, email } } = data;
    if  (error) {
      return Alert.alert(
        'Oops!',
          errorsToHumans(error),
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    }

    let trackingOpts = {
      id,
      usernameOrEmail: email,
    };

    Analytics.identify(id, TrackingOpts);
    Analytics.track(Analytics.events.USER_LOGGED_IN, trackingOpts);

    await AsyncStorage.setItem(APP_KEYS.LOGIN, token);
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION} onCompleted={(data: any) => this._signInAsync(data)}>
        {(mutation: any) => <SignInScreenForm navigation={this.props.navigation} mutation={mutation}/>}
      </Mutation>
    );
  }
}