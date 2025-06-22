import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from '../screens/LandingPage';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';
import HomePage from '../screens/HomePage';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginPage}/>
      <Stack.Screen name="Signup" component={SignupPage}/>
      <Stack.Screen name="Home" component={HomePage}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;