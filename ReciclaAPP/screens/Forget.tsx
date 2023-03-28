import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { FormikProps } from 'formik';
import { Mutation } from 'react-apollo'
import ForgetForm from './ForgetForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { FORGET_PASSWORD } from '../graphql/mutations';
import Analytics from '../services/Analytics';

type ForgetScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any, mutation: any } & FormikProps<ForgetScreenProps>

export default class ForgetScreen extends PureComponent<MixedProps, {}> {
  static navigationOptions = {
    title: 'Esqueci a senha',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  _signInAsync = async (data: any) => {
    const { UserForgetPassword : {error, email } } = data;
    if  (error) {
      return Alert.alert(
        'Oops!',
          errorsToHumans(error),
        [
          // {text: 'Gerar novo', onPress: () => console.log('OK Pressed')},
          {text: 'Ok', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    }
    // await AsyncStorage.setItem(APP_KEYS.LOGIN, token);
    Alert.alert(
      'Enviado',
       'Confira a sua caixa de e-mails',
      [
        // {text: 'Gerar novo', onPress: () => console.log('OK Pressed')},
        {text: 'Ok', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );

    let trackingOpts = {
      usernameOrEmail: email,
    };

    Analytics.track(Analytics.events.USER_FORGET_PASSWORD, trackingOpts);

    return this.props.navigation.goBack()
  };

  render() {
    const token = this.props.navigation.getParam('token', null)

    return (
      <Mutation mutation={FORGET_PASSWORD} onCompleted={(data: any) => this._signInAsync(data)}>
        {(mutation: any) => <ForgetForm navigation={this.props.navigation} mutation={mutation} token={token}/>}
      </Mutation>
    );
  }
}
