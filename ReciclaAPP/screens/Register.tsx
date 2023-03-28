import React, { PureComponent } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { FormikProps } from 'formik';
import { Mutation } from 'react-apollo'
import RegisterForm from './RegisterForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { REGISTER_MUTATION } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';
import { PROFILE_QUERY } from '../graphql/queries';
import Analytics, { TrackingOpts } from '../services/Analytics';

type RegisterScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any, mutation: any } & FormikProps<RegisterScreenProps>

export default class RegisterScreen extends PureComponent<MixedProps, {}> {
  static navigationOptions = {
    title: 'Criar conta',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  _signInAsync = async (data: any) => {
    const { UserRegisterWithEmail: { error, token, id, email } } = data;
    if (error) {
      return Alert.alert(
        'Oops!',
        errorsToHumans(error),
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true },
      );
    }
    await AsyncStorage.setItem(APP_KEYS.LOGIN, token);

    let trackingOpts = {
      id,
      usernameOrEmail: email,
    };

    Analytics.identify(id, TrackingOpts);
    Analytics.track(Analytics.events.USER_CREATED_ACCOUNT, trackingOpts);

    return this.props.navigation.navigate('App');
  };

  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION} onCompleted={(data: any) => this._signInAsync(data)}>
        {(mutation: any) => <RegisterForm navigation={this.props.navigation} mutation={mutation} />}
      </Mutation>
    );
  }
}
