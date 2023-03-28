import React, { PureComponent } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { FormikProps } from 'formik';
import { Mutation, Query } from 'react-apollo'
import ProfileScreenForm from './ProfileScreenForm';
import { errorsToHumans } from '../utils/normalizeErrors';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { theme as color } from '../constants/Colors';
import { PROFILE_QUERY } from '../graphql/queries';

type ProfileScreenProps = {
  password: string,
  email: string,
}

type MixedProps = { navigation: any, mutation: any } & FormikProps<ProfileScreenProps>

export default class ProfileScreen extends PureComponent<MixedProps, {}> {
  static navigationOptions = {
    title: 'Meu perfil',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
    headerTintColor: color.BLUE,
  }

  _signInAsync = async (data: any) => {
    const { UserLoginWithEmail : {error, token } } = data;
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

  };

  render() {
    return (
      <Query query={PROFILE_QUERY} >
        {({ client, loading, data: { me }, error }: any) => {
          if (loading) {
            return <ActivityIndicator/>
          }
          if (error) {
            return 
          }
          return (
            <Mutation mutation={LOGIN_MUTATION} onCompleted={(data: any) => this._signInAsync(data)}>
              {(mutation: any) => <ProfileScreenForm me={me} navigation={this.props.navigation} mutation={mutation}/>}
            </Mutation>
          )
        }} 
      </Query>
    );
  }
}
