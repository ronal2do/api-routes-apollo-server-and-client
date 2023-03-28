
import React, { useState, useEffect } from 'react';
import { View, ScrollView, ImageBackground, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications';
import Typography from '../components/Typography';
import { QUOTES } from '../constants/Data';
import { theme as color } from '../constants/Colors';

import { PROFILE_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import AnimatedNumber from '../components/AnimatedNumber';
import { ADD_POINTS, USER_PUSH_TOKEN } from '../graphql/mutations';
import { client } from '../services/apollo';
import Analytics from '../services/Analytics';
import Button from 'react-native-really-awesome-button';
import { useNavigation } from 'expo-router';

interface QuoteType {
  id: string;
  title: string;
  phrase: string;
}

export const MyHomeScreen: React.FC = () => {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [me, setMe] = useState<any | null>(null);

  useEffect(() => {
    getQuote();
    registerForPushNotificationsAsync();
    getProfile();
  }, []);

  const getProfile = async () => {
    if (me === null) {
      try {
        const { data } = await client.query({ query: PROFILE_QUERY });
        setMe(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const registerForPushNotificationsAsync = async () => {
    Notifications.getBadgeCountAsync().then(() => Notifications.setBadgeCountAsync(0));
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync();
      await client
      .mutate({
        mutation: USER_PUSH_TOKEN,
        variables: {
          os: Platform.OS,
          token
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getQuote = async () => {
    try {
      const max = QUOTES.length;
      const index = Math.floor(Math.random() * (max - 0)) + 0;
      // @ts-ignore
      setQuote(QUOTES[index]);
    } catch (error) {
      console.log(error);
      Analytics.track(Analytics.events.ERROR, { path: 'Home.tsx', func: 'getQuote' , error });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
        <ImageBackground style={styles.header} imageStyle={styles.backImage} resizeMode="contain" source={require('../assets/images/home.png')}>
          <Hero />
        </ImageBackground>
        <View style={styles.container}>
          {quote !== null ? (
            <>
              <ImageBackground resizeMode="contain" style={styles.stars} source={require('../assets/images/stars01.png')}>
                <Typography kind="instructions" style={{ fontWeight: '900' }}>
                  Dica do dia
                </Typography>
                <Typography kind="welcome" color={color.GREEN}>
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
      <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white' }}>
        <ButtonGame />
      </View>
    </View>
  );
};

const Hero = () => {
    const { loading, data, error, refetch } = useQuery(PROFILE_QUERY)
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
}

const ButtonGame = () => {
	const { loading, data, error } = useQuery(PROFILE_QUERY)
  // const router = useNavigation();

	const welcomeToTheGame = async (points: number, _id: string) => {
    try {
      Number(points) === 0 ? 
        client.mutate({
          mutation: ADD_POINTS,
          variables: { userId: _id, action: 'GOLD' },
          refetchQueries: () => [{ query: PROFILE_QUERY }]
        }).then(() => {
          Analytics.track(Analytics.events.START_GAME, { id: _id })
          // router.navigate('Quizz')}
        }) : (
          Analytics.track(Analytics.events.START_GAME, { id: _id })

        ) 
				
				// router.navigate('Quizz')
    } catch (error) {
      Analytics.track(Analytics.events.ERROR, { 
        path: 'Home.tsx', 
        func: 'welcomeToTheGame' , 
        error 
      });
    }
  }
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
				onPress={() => welcomeToTheGame(points, _id)}
			>
        {Number(points) === 0 ? "Começar a jogar" : "Continuar jogando" }
      </Button>
		);
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
