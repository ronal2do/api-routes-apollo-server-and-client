import React from 'react';
import { Alert } from 'react-native';
import SignInScreenForm from './SignInScreenForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';
import Analytics from '../services/Analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../navigation/AuthContext';

interface LoginMutationResponse {
  loginUserWithEmail: {
    error: any
    token: string
    id: string
  }
}

export default function SignInScreen() {
  const { signIn } = React.useContext(AuthContext);

  const [loginUserWithEmail] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: LoginMutationResponse) => {
      const { loginUserWithEmail: { error, token, id } } = data;
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
        signIn(token)

      AsyncStorage.setItem(APP_KEYS.LOGIN, token).then(() => {
        Analytics.identify(id);
        Analytics.track(Analytics.events.USER_CREATED_ACCOUNT);
      });
    }
  });


  return (
    <SignInScreenForm mutation={loginUserWithEmail}/>
  )
}