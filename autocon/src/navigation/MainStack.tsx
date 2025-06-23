import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
}