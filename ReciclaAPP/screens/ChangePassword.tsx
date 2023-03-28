import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { FormikProps } from 'formik';
import ChangePasswordForm from './ChangePasswordForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { theme as color } from '../constants/Colors';
import { CHANGE_PASSWORD } from '../graphql/mutations';
import { useNavigation } from '@react-navigation/native';

type ChangePasswordScreenProps = {
  password: string;
  email: string;
};

type MixedProps = FormikProps<ChangePasswordScreenProps>;

export default function ChangePasswordScreen({ }: MixedProps) {
  const navigation = useNavigation()
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      const { data } = await changePassword({
        variables: {
          ...values,
        },
      });

      const { UserChangePassword: { error } } = data;

      if (error) {
        Alert.alert(
          'Oops!',
          errorsToHumans(error),
          [{ text: 'Ok', onPress: () => console.log('OK Pressed') }],
          { cancelable: true },
        );
      } else {
        navigation.goBack();
      }
    } catch (err) {
      console.log('Error changing password: ', err);
    }
  }, [changePassword, navigation]);

  return (
    <ChangePasswordForm onSubmit={handleSubmit} loading={loading} />
  );
}

ChangePasswordScreen.navigationOptions = {
  title: 'Alterar senha',
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  headerTintColor: color.BLUE,
};
