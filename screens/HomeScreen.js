import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { logoutUser } from '../utils/auth'; 


export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await logoutUser();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a Tragos El Obi!</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' }
});
