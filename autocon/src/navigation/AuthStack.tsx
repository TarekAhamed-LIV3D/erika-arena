import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignupPage} />
    </Stack.Navigator>
  );
}


