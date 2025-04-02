import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrinksScreen from './screens/DrinksScreen';

import { isSessionActive } from './utils/auth';
import { CartProvider } from './screens/CartContext';
import CartScreen from './screens/CartScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isSessionActive();
      setInitialRoute(loggedIn ? 'Drinks' : 'Login');
    };
    checkLoginStatus();
  }, []);

  if (!initialRoute) return null;

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Login" component={LoginScreen}options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen}options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen}options={{ headerShown: false }} />
          <Stack.Screen name="Drinks" component={DrinksScreen}options={{ headerShown: false }}  />
          <Stack.Screen name="Cart" component={CartScreen}

          />

        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

