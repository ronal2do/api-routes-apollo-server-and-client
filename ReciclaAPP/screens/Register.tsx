import React from 'react';
import { Alert } from 'react-native';
import { FormikProps } from 'formik';
import { useMutation } from '@apollo/client';
import RegisterForm from './RegisterForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { REGISTER_MUTATION } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';
import Analytics from '../services/Analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function RegisterScreen({ navigation }: Props) {
  const [registerUserWithEmail] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data: any) => {
      const { registerUserWithEmail: { error, token, user, email } } = data;
      if (error) {
        console.log('-== register error', error)
        return Alert.alert(
          'Oops!',
          errorsToHumans(error),
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true },
        );
      }
      AsyncStorage.setItem(APP_KEYS.LOGIN, token).then(() => {
        let trackingOpts = {
          id: user.id,
          usernameOrEmail: email,
        };
        Analytics.identify(user.id);
        Analytics.track(Analytics.events.USER_CREATED_ACCOUNT, trackingOpts);
        navigation.navigate('App');
      });
    }
  });

  return (
    <RegisterForm mutation={registerUserWithEmail} />
  );
}
