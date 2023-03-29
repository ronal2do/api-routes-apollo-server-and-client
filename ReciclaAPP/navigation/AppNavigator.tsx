import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import {MyHomeScreen} from '../screens/Home';
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
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  App: undefined;
  Home: undefined;
  SignUp: { userId: string };
  Forget: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'App'>;




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function SettingsStacks() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Licences" component={LicencesScreen} />
      <SettingsStack.Screen name="SendAError" component={SendAErrorScreen} />
      <SettingsStack.Screen name="Feedback" component={FeedbackScreen} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
      {/* <SettingsStack.Screen name="ChangePassword" component={ChangePasswordScreen} /> */}
    </SettingsStack.Navigator>
  );
}

function AuthStackScreens() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={RegisterScreen} />
      <AuthStack.Screen name="Forget" component={ForgetScreen} />
      <AuthStack.Screen name="Reset" component={ResetScreen} />
    </AuthStack.Navigator>
  );
}

function MyDrawerNavigator() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Home" component={AppStack} />
      <Drawer.Screen name="Sorteios" component={SorteioScreen} />
      <Drawer.Screen name="Cupons" component={CupomsScreen} />
      <Drawer.Screen name="Coleta" component={ColetaScreen} />
      <Drawer.Screen name="Separação" component={SeparacaoScreen} />
      <Drawer.Screen name="Reciclagem" component={ReciclagemScreen} />
      <Drawer.Screen name="Programa" component={ProgramaScreen} />
      <Drawer.Screen name="Cooperativas" component={CooperativaScreen} />
      <Drawer.Screen name="Contato" component={ContatoScreen} />
      <Drawer.Screen name="Configurações" component={SettingsStacks} />
    </Drawer.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyHome" component={MyHomeScreen}
      //  options={{
      //   headerShown: false
      // }}
      />
      <Stack.Screen name="Quizz" component={QuizzScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export function AppNavigator({ userToken }: { userToken?: string }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        { userToken == null ? (
          <Stack.Screen name="Auth" component={AuthStackScreens} />
        ): (
          <Stack.Screen name="App" component={MyDrawerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer> 
  );
}