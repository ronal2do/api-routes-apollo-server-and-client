import { RouteProp } from '@react-navigation/native'  

export type MainStackParamList = {
  App: undefined;
  About: undefined;
  Settings: undefined;
  Licences: undefined;
  Home: undefined;
  SignUp: undefined;
  Forget: undefined;
  Feed: undefined;
  Quizz: undefined;
  ProfileScreen: { me: any };
  ChangePassword: undefined;
  SendAError: undefined;
  Feedback: undefined;
  Profile: undefined;
  SignIn: undefined;
  Reset: undefined;
  MyHome: undefined;
  Splash: undefined;
  Auth: undefined;
};

export type QuizzScreeenRouteProp = RouteProp<MainStackParamList, 'Quizz'>

// const route = useRoute<QuizzScreeenRouteProp>();