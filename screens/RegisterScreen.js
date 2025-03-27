import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // ✅ Import necesario



export default function RegisterScreen() {
    const navigation = useNavigation();
  
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async () => {
      if (!name || !phone || !username || !password) {
        Alert.alert('Error', 'Por favor completá todos los campos');
        return;
      }
  
      const newUser = { name, phone, username, password };
  
      try {
        const storedUsers = await AsyncStorage.getItem('registeredUsers');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
  
        const userExists = users.some((user) => user.username === username);
        if (userExists) {
          Alert.alert('Error', 'Ese nombre de usuario ya existe');
          return;
        }
  
        users.push(newUser);
        await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));
  
        Alert.alert('Éxito', '¡Usuario registrado con éxito!');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar los datos');
        console.log(error);
      }
    };

  return (
    <ImageBackground
      source={require('../assets/tragos-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.title}>Registro de usuario</Text>

        <TextInput
          placeholder="Nombre completo"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Celular"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>¿Ya tenés cuenta? Iniciá sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#FF0055',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  linkText: {
    color: '#00f',
    marginTop: 15
  }
});
