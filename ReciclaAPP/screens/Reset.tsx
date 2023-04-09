import React from 'react';
import { Alert } from 'react-native';
import { FormikProps } from 'formik';
import { useMutation } from '@apollo/client';
import ResetForm from './ResetForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { RESET_PASSWORD } from '../graphql/mutations';
import { APP_KEYS } from '../utils/asyncStorage';
import Analytics from '../services/Analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type ResetScreenProps = {
  password: string;
  email: string;
};

type MixedProps = FormikProps<ResetScreenProps>;

export default function ResetScreen({ navigation }: any) {
  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: (data: any) => _signInAsync(data),
  });

  const _signInAsync = async (data: any) => {
    const { UserResetPassword: { error, token, id, email } } = data;
    if (error) {
      return Alert.alert(
        'Oops!',
        errorsToHumans(error),
        [
          { text: 'Gerar novo', onPress: () => console.log('OK Pressed') },
          { text: 'Cancelar', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true },
      );
    }
    await AsyncStorage.setItem(APP_KEYS.LOGIN, token);
    let trackingOpts = {
      id,
      usernameOrEmail: email,
    };

    Analytics.track(Analytics.events.USER_RESET_PASSWORD, trackingOpts);

    return navigation.navigate('App');
  };

  return <ResetForm navigation={null} resetPassword={resetPassword} token={null} />;
}

ResetScreen.navigationOptions = {
  title: 'Nova senha',
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  headerTintColor: color.BLUE,
};
