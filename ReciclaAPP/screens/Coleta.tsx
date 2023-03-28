import React from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import Typography from '../components/Typography';
import { theme as color } from '../constants/Colors';
import Menu from '../components/Menu';
import { COLETA_MOCK } from '../constants/Data';
import Me from '../components/Me';
import Analytics from '../services/Analytics';

type ContactScreenState = {
  centro: any,
  vila: any,
  nacoes: any,
  outros: any,
  loading: boolean
};

export default class ContactScreen extends React.PureComponent<{}, ContactScreenState> {
  static navigationOptions = {
    title: 'Coleta',
    headerStyle: {
      backgroundColor: color.RED,
      borderBottomWidth: 0,
    },
    headerLeft: <Menu />,
    headerRight: <Me />
  }

  state: ContactScreenState = {
    centro: null,
    vila: null,
    nacoes: null,
    outros: null,
    loading: true
  };

  componentDidMount() {
    this.getCollectionDays();
  }

  getCollectionDays = async () => {
    try {
      await this.setState({
        centro: COLETA_MOCK.filter(c => c.group === "centro"),
        vila: COLETA_MOCK.filter(c => c.group === "vila"),
        nacoes: COLETA_MOCK.filter(c => c.group === "nacoes"),
        outros: COLETA_MOCK.filter(c => c.group === "outros"),
        loading: false
      });
    } catch (error) {
      console.warn("!!error", error);
    }
  };

  goToLink = (url: string): void => {
    Linking.canOpenURL(url)
    .then((supported: boolean) => {
      if (!supported) {
        Analytics.track(Analytics.events.ERROR, { path: 'Settings.tsx', func: 'goToLink' , error: "Can't handle url: " + url });
      } else {
        Analytics.track(Analytics.events.USER_OPEN_LINK, { url });
        return Linking.openURL(url);
      }
    })
    .catch((err: string) =>  Analytics.track(Analytics.events.ERROR, { path: 'Settings.tsx', func: 'goToLink' , error: err }));
  }

  render() {
    const { centro, vila, nacoes, outros, loading } = this.state;
    return (
      <ScrollView style={{ backgroundColor: color.RED }}>
        <View style={styles.container}>
          <Typography kind="welcome" color="#fff">
            Confira os dias e os turnos em que a coleta seletiva passa em sua região:
          </Typography>
          <Typography kind="titleSmall" color="#fff">
            Se preferir, clique no número abaixo e fale direto com a gente
          </Typography>
          <TouchableOpacity
            onPress={() => this.goToLink('https://api.whatsapp.com/send?phone=5547996479495')}
          >
            <Typography kind="titleSmall" color="#fff" style={{  }}>
              996 479 495
          </Typography>
          </TouchableOpacity>
          <Typography kind="instructions" color="#fff">
            Separe seu lixo reciclável (metal, plástico, vidro e papel) e coloque na rua somente no dia da sua coleta.
          </Typography>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={[styles.container, { backgroundColor: color.YELLOW }]}>
              <Typography kind="title" color="#fff">
                Centro
              </Typography>
              {centro.map(({ id, place, date }: any) => (
                <React.Fragment key={id}>
                  <Typography kind="titleSmall" color="#fff">
                    {place}
                  </Typography>
                  <Typography kind="instructions" color="#fff" style={{ fontStyle: "italic", marginBottom: 15 }}>
                    {date}
                  </Typography>
                </React.Fragment>
              ))}
            </View>
            <View style={[styles.container, { backgroundColor: color.GREEN }]}>
              <Typography kind="title" color="#fff">
                Vila Real
              </Typography>
              {vila.map(({ id, place, date }: any) => (
                <React.Fragment key={id}>
                  <Typography kind="titleSmall" color="#fff">
                    {place}
                  </Typography>
                  <Typography kind="instructions" color="#fff" style={{ fontStyle: "italic", marginBottom: 15 }}>
                    {date}
                  </Typography>
                </React.Fragment>
              ))}
            </View>
            <View style={[styles.container, { backgroundColor: color.CYAN }]}>
              <Typography kind="title" color="#fff">
                Nações
              </Typography>
              {nacoes.map(({ id, place, date }: any) => (
                <React.Fragment key={id}>
                  <Typography kind="titleSmall" color="#fff">
                    {place}
                  </Typography>
                  <Typography kind="instructions" color="#fff" style={{ fontStyle: "italic", marginBottom: 15 }}>
                    {date}
                  </Typography>
                </React.Fragment>
              ))}
            </View>
            <View style={styles.container}>
              {outros.map(({ id, place, date }: any) => (
                <React.Fragment key={id}>
                  <Typography kind="titleSmall" color="#fff">
                    {place}
                  </Typography>
                  <Typography kind="instructions" color="#fff" style={{ fontStyle: "italic", marginBottom: 15 }}>
                    {date}
                  </Typography>
                </React.Fragment>
              ))}
            </View>
          </>
        )}

        <View style={styles.logoContainer}>
          <Image source={require("../assets/images/truck.png")} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 30
  },
  logoContainer: {
    height: 105,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: color.RED
  },
  inputContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  }
});
