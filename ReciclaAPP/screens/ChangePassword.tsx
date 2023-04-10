import React, { useCallback, useLayoutEffect } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { FormikProps } from 'formik';
import ChangePasswordForm from './ChangePasswordForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { CHANGE_PASSWORD } from '../graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { NavigationWrapper } from '../components/NavigationWrapper';

type ChangePasswordScreenProps = {};

export const ChangePasswordScreen = ({ }: ChangePasswordScreenProps) => {
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
    <NavigationWrapper variant={true}>
      <ChangePasswordForm onSubmit={handleSubmit} loading={loading} />
    </NavigationWrapper>
  );
}
