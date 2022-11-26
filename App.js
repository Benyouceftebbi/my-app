import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation/Navigation';
import {registerRootComponent} from 'expo';
import HomeScreen from './Screens/HomeScreen';
import LogInScreen from './Screens/LogInScreen';
import RequestScreen from './Screens/RequestScreen';
import Notification from './Screens/Notification';
import SignUpScreen from './Screens/SignUpScreen';
import CreateTeam from './Screens/CreateTeam'
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
    <CreateTeam/>
  </NavigationContainer>
  </ApplicationProvider>
  );
}
registerRootComponent(App)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
