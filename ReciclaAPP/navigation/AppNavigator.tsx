import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import MyHomeScreen from '../screens/Home';
import QuizzScreen from '../screens/Quizz';
import ColetaScreen from '../app/Coleta';
import ContatoScreen from '../screens/Contato';
import CooperativaScreen from '../screens/Cooperativa';
import ProgramaScreen from '../screens/Programa';
import ReciclagemScreen from '../screens/Reciclagem';
import SeparacaoScreen from '../screens/Separation';
import CupomsScreen from '../app/Cupoms';
import SorteioScreen from '../screens/Sorteio';
import SettingsScreen from '../screens/Settings';
import LicencesScreen from '../screens/Licences';
import SendAErrorScreen from '../screens/SendAError';
import FeedbackScreen from '../screens/Feedback';
import ProfileScreen from '../screens/Profile';
import RegisterScreen from '../screens/Register';
import ResetScreen from '../screens/Reset';
import ForgetScreen from '../screens/Forget';
import AboutScreen from '../app/About';
import ChangePasswordScreen from '../screens/ChangePassword';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MyHomeScreen} />
      <Stack.Screen name="Quizz" component={QuizzScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

function SettingsStacks() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Licences" component={LicencesScreen} />
      <SettingsStack.Screen name="SendAError" component={SendAErrorScreen} />
      <SettingsStack.Screen name="Feedback" component={FeedbackScreen} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
      <SettingsStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </SettingsStack.Navigator>
  );
}

function AuthStackScreens() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={RegisterScreen} />
      <AuthStack.Screen name="Forget" component={ForgetScreen} />
      <AuthStack.Screen name="Reset" component={ResetScreen} />
    </AuthStack.Navigator>
  );
}

function MyDrawerNavigator() {
  return (
    <Drawer.Navigator
      // drawerContentOptions={{
      //   activeTintColor: theme.CYAN,
      //   inactiveTintColor: '#FFF',
      //   drawerBackgroundColor: theme.BLUE
      // }}
    >
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="App" component={MyDrawerNavigator} />
        <Stack.Screen name="Auth" component={AuthStackScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;