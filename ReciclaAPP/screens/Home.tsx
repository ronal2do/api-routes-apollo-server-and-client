import React from 'react';
import { StyleSheet, View, ActivityIndicator, ImageBackground, ScrollView, Platform } from 'react-native';
import LogoTitle from '../components/LogoTitle';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { theme as color } from '../constants/Colors';
import { QUOTES, QuoteType } from '../constants/Data';
import Menu from '../components/Menu';
import Me from '../components/Me';
import { Query } from 'react-apollo';
import { PROFILE_QUERY } from '../graphql/queries';
import { NavigationScreenProp } from 'react-navigation';
import AnimatedNumber from '../components/AnimatedNumber';
import { client } from '../services/apollo';
import { ADD_POINTS, USER_PUSH_TOKEN } from '../graphql/mutations';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import Analytics from '../services/Analytics';

type MyHomeScreenProps = {
  navigation: NavigationScreenProp<any>
};

type MyHomeScreenState = {
  quote: QuoteType | null | undefined,
  me: any,
};

export default class MyHomeScreen extends React.PureComponent<MyHomeScreenProps, MyHomeScreenState> {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerLeft: <Menu />,
    headerRight: <Me />,
  }

  state: MyHomeScreenState = {
    quote: null,
    me: null,
  };

  componentDidMount() {
    this.getQuote();
    this.registerForPushNotificationsAsync();
    this.getProfile();
  }

  getProfile = async () => {
    if (this.state.me == null ) {
      await client
        .query({
          query: PROFILE_QUERY,
      }).then(console.log)
    }
  }

  registerForPushNotificationsAsync = async () => {
    Notifications.getBadgeNumberAsync().then(() => Notifications.setBadgeNumberAsync(0))
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    
    if (status !== 'granted') {
      return;
    }
    
    let token = await Notifications.getExpoPushTokenAsync();

    client
      .mutate({
        mutation: USER_PUSH_TOKEN,
        variables: {
          os: Platform.OS,
          token
        },
        // refetchQueries: () => [{ query: PROFILE_QUERY }]
      }).then(console.log)

    // this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  getQuote = async () => {
    try {
      const max = QUOTES.length;
      const index = Math.floor(Math.random() * (max - 0)) + 0;
      await this.setState({ quote: QUOTES[index] });
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { path: 'Home.tsx', func: 'getQuote' , error });
    }
  };

  welcomeToTheGame = async (points: number, _id: string) => {
    try {
      Number(points) === 0 ?
        client.mutate({
          mutation: ADD_POINTS,
          variables: { userId: _id, action: 'GOLD' },
          refetchQueries: () => [{ query: PROFILE_QUERY }]
        }).then(() => {
          Analytics.track(Analytics.events.START_GAME, { id: _id });
          this.props.navigation.navigate('Quizz')}
        ) : this.props.navigation.navigate('Quizz')
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { 
        path: 'Home.tsx', 
        func: 'welcomeToTheGame' , 
        error 
      });
    }
  }

  render() {
    const { quote } = this.state;

    return (
      <View style={{  flex: 1 }}>
        <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
          <ImageBackground style={styles.header} imageStyle={styles.backImage} resizeMode="contain" source={require('../assets/images/home.png')}>
            <Query query={PROFILE_QUERY} >
              {({ loading, data, error, refetch }: any) => {
                if (loading) {
                  return (
                    <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                      Loading
                    </Typography>
                  );
                }
                if (error) {
                  return (
                    <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                      Algo deu errado
                    </Typography>
                  );
                }
                if (data.me == null) {
                  return (
                    <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                      Loading
                    </Typography>
                  );
                }
                const { me } = data;                
                return (
                  <>
                    <Typography kind="welcome" color="#fff">
                      Olá {me.name ? me.name : ''},
                    </Typography>
                    <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                      Você tem
                    </Typography>
                    <View style={styles.points}>
                      <AnimatedNumber kind="big" color={color.CYAN} value={me.points.points || 0} timing="linear"/>
                      <Typography kind="instructions" color={color.CYAN}>
                        {' '}
                        pontos
                      </Typography>
                    </View>
                    <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                      Para ganhar mais pontos e cupons, responda as perguntas e fique atento às notificações.
                    </Typography>
                  </>
                );
              }}
            </Query>
          </ImageBackground>
          <View style={styles.container}>
            { quote != null ? (
              <>
                <ImageBackground resizeMode="contain" style={styles.stars} source={require('../assets/images/stars01.png')}>
                  <Typography kind="instructions" style={{ fontWeight: '900' }}>
                    Dica do dia
                  </Typography>
                  <Typography kind="welcome" color={color.GREEN} style>
                    {quote.title}
                  </Typography>
                </ImageBackground>

                <Typography kind="instructions" style={{ paddingVertical: 20, paddingHorizontal: 40, textAlign: 'center' }}>
                  {quote.phrase}
                </Typography>
              </>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </ScrollView>
        <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',backgroundColor: 'white' }}>
          <Query query={PROFILE_QUERY} >
            {({ loading, data, error }: any) => {
              if (loading) {
                return (
                  <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                    Loading
                  </Typography>
                );
              }
              if (error) {
                return (
                  <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                    Algo deu errado
                  </Typography>
                );
              }

              if (data.me == null) {
                return (
                  <Typography kind="instructions" color="#fff" style={{ width: 200 }}>
                    Loading
                  </Typography>
                );
              }

              const { points: { points }, _id } = data.me;                
              return (
                <Button
                  backgroundColor={color.GREEN}
                  raiseLevel={0}
                  textColor="white"
                  label={Number(points) === 0 ? "Começar a jogar" : "Continuar jogando" } // user pontos === 0 'jogar'
                  onPress={() => this.welcomeToTheGame(points, _id)}
                />
              );
            }}
          </Query>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 250,
    alignItems: 'flex-start',
    backgroundColor: color.BLUE,
    paddingHorizontal: 35,
    paddingVertical: 20
  },
  stars: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backImage: {
    marginTop: Platform.OS === 'ios' ? 46 : 60
  },
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 15,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center'
  },
  instructions: {
    width: 200,
    textAlign: 'left',
    color: '#fff'
  },
  points: {
    flexDirection: 'row',
    alignItems: Platform.OS === 'ios' ? 'baseline' : 'center'
  }
});
