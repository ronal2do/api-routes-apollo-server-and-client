import React from 'react';
import { Alert } from 'react-native';
import { FormikProps } from 'formik';
import { useMutation } from '@apollo/client';
import RegisterForm from './RegisterForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { REGISTER_MUTATION } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';
import Analytics from '../services/Analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any } & FormikProps<RegisterScreenProps>

export default function RegisterScreen({ navigation }: MixedProps) {
  const [registerUser] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data: any) => {
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
      AsyncStorage.setItem(APP_KEYS.LOGIN, token).then(() => {
        let trackingOpts = {
          id,
          usernameOrEmail: email,
        };

        Analytics.identify(id);
        Analytics.track(Analytics.events.USER_CREATED_ACCOUNT);
        navigation.navigate('App');
      });
    }
  });

  return (
    <RegisterForm navigation={navigation} mutation={registerUser} />
  );
}

RegisterScreen.navigationOptions = {
  title: 'Criar conta',
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  headerTintColor: color.BLUE,
};
