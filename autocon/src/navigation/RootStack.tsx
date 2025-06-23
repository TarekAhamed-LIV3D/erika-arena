import React from 'react';
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

const RootStack = () => (
  <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={LandingPage} />
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Signup" component={SignupPage} />
    <Stack.Screen name="Home" component={HomePage} />
  </Stack.Navigator>
);

export default RootStack;
