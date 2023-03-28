import React from 'react';
import {
  Notifications,
} from 'expo';
import {
  View,
} from 'react-native';
import Typography from '../components/Typography'
// This refers to the function defined earlier in this guide
import { registerForPushNotificationsAsync } from '../services/notifications';

export default class AppContainer extends React.PureComponent {
  state = {
    notification: {},
  };

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Typography>Origin: {this.state.notification.origin}</Typography>
        <Typography>Data: {JSON.stringify(this.state.notification.data)}</Typography>
      </View>
    );
  }
}