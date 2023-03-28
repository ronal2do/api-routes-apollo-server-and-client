import { createDrawerNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import MyHomeScreen from '../screens/Home';
import QuizzScreen from '../screens/Quizz';
import ColetaScreen from '../screens/Coleta';
import ContatoScreen from '../screens/Contato';
import CooperativaScreen from '../screens/Cooperativa';
import ProgramaScreen from '../screens/Programa';
import ReciclagemScreen from '../screens/Reciclagem';
import SeparacaoScreen from '../screens/Separation';
import CupomsScreen from '../screens/Cupoms';
import SorteioScreen from '../screens/Sorteio';
import SettingsScreen from '../screens/Settings';
import LicencesScreen from '../screens/Licences';
import SendAErrorScreen from '../screens/SendAError';
import FeedbackScreen from '../screens/Feedback';
import ProfileScreen from '../screens/Profile';
import RegisterScreen from '../screens/Register';
import ResetScreen from '../screens/Reset';
import ForgetScreen from '../screens/Forget';
import AboutScreen from '../screens/About';
import ChangePasswordScreen from '../screens/ChangePassword';

import { theme } from '../constants/Colors';

const options: any = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.BLUE,
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 12
    },
    headerBackTitle: null
  }
};

const sharedScreens = {
  Profile: ProfileScreen, 
  ChangePassword: ChangePasswordScreen
}

const AppStack = createStackNavigator(
  {
    Home: MyHomeScreen,
    Quizz: QuizzScreen, 
    ...sharedScreens
  },
  options
);

const QuizzStack = createStackNavigator({ Quizz: QuizzScreen, ...sharedScreens }, options);
const ColetaStack = createStackNavigator({ Coleta: ColetaScreen, ...sharedScreens }, options);
const ContatoStack = createStackNavigator({ Contato: ContatoScreen, ...sharedScreens }, options);
const CooperativaStack = createStackNavigator({ Cooperativa: CooperativaScreen, ...sharedScreens }, options);
const ProgramaStack = createStackNavigator({ Programa: ProgramaScreen, ...sharedScreens }, options);
const ReciclagemStack = createStackNavigator({ Reciclagem: ReciclagemScreen, ...sharedScreens }, options);
const SeparacaoStack = createStackNavigator({ Separacao: SeparacaoScreen, ...sharedScreens }, options);
const CupomsStack = createStackNavigator({ Cupoms: CupomsScreen, ...sharedScreens }, options);
const SorteiosStack = createStackNavigator({ Sorteios: SorteioScreen, ...sharedScreens }, options);
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Licences: LicencesScreen,
    SendAError: SendAErrorScreen,
    Feedback: FeedbackScreen,
    About: AboutScreen,
    ...sharedScreens
  },
  options
);

const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerMode: 'none'
      }
    },
    SignUp: RegisterScreen,
    Forget: ForgetScreen,
    Reset: {
      screen: ResetScreen,
      path: 'reset/:token',
      navigationOptions: ({ navigation }: any) => ({
        // title: `${navigation.state.params.token}'s Profile'`,
      }),
    }
  },
  {
    ...options
  }
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppStack },
    // Quizz: { screen: QuizzStack },
    Sorteios: { screen: SorteiosStack },
    Cupons: { screen: CupomsStack },
    Coleta: { screen: ColetaStack },
    Separação: { screen: SeparacaoStack },
    Reciclagem: { screen: ReciclagemStack },
    Programa: { screen: ProgramaStack },
    Cooperativas: { screen: CooperativaStack },
    Contato: { screen: ContatoStack },
    Configurações: { screen: SettingsStack }
  },
  {
    drawerBackgroundColor: theme.BLUE,
    contentOptions: {
      activeTintColor: theme.CYAN,
      inactiveTintColor: '#FFF',
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MyDrawerNavigator,
      Auth: {
        screen: AuthStack,
        path: 'auth'
      },
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
