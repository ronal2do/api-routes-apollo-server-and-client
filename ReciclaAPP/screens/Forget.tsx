import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import ForgetForm from './ForgetForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { FORGET_PASSWORD } from '../graphql/mutations';
import Analytics from '../services/Analytics';

type ForgetScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any } & ForgetScreenProps;

export default function ForgetScreen({ navigation }: any) {
  const [forgetPassword] = useMutation(FORGET_PASSWORD, {
    onCompleted: (data: any) => {
      const { UserForgetPassword: { error, email } } = data;
      if (error) {
        Alert.alert(
          'Oops!',
          errorsToHumans(error),
          [
            { text: 'Ok', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true },
        );
      } else {
        Alert.alert(
          'Enviado',
          'Confira a sua caixa de e-mails',
          [
            { text: 'Ok', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true },
        );

        let trackingOpts = {
          usernameOrEmail: email,
        };

        Analytics.track(Analytics.events.USER_FORGET_PASSWORD, trackingOpts);

        navigation.goBack();
      }
    },
  });

  return (
    <ForgetForm navigation={navigation} forgetPassword={forgetPassword} />
  );
}

ForgetScreen.navigationOptions = {
  headerTitle: 'Esqueci a senha',
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  headerTintColor: color.BLUE,
};
