import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useEffect, useState } from 'react';
import { isUserLoggedIn } from './utils/auth'; 




const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isUserLoggedIn();
      setInitialRoute(loggedIn ? 'Home' : 'Login');
    };

    checkLoginStatus();
  }, []);

  if (!initialRoute) return null; // o una pantalla de carga

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />

</Stack.Navigator>
</NavigationContainer>
  );
}
