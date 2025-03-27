import { loginUser, isUserLoggedIn } from '../utils/auth'; 
import React, { useState } from 'react';
import { View, Text, TextInput, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

export default function LoginScreen() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (user === '' || password === '') {
      alert('Por favor completá todos los campos');
      return;
    }
  
    const isValid = await isUserLoggedIn(user, password);
  
    if (!isValid) {
      alert('Usuario o contraseña incorrectos');
      return;
    }
  
    await loginUser();
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={require('../assets/tragos-bg.png')} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={require('../assets/obi-logo.png')} style={styles.logo} />
        <Text style={styles.title}>Tragos El Obi</Text>

        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
  <Text style={{ marginTop: 12, color: '#007bff', textAlign: 'center' }}>
    ¿No tenés cuenta? Registrate acá
  </Text>
</TouchableOpacity>

      </View>
    </ImageBackground>
  );
}
