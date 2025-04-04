import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async () => {
  try {
    await AsyncStorage.setItem('isLoggedIn', 'true');
  } catch (error) {
    console.log('Error al guardar estado de login', error);
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('isLoggedIn');
  } catch (error) {
    console.log('Error al cerrar sesión', error);
  }
};
// Para App.js
export const isSessionActive = async () => {
  try {
    const loggedIn = await AsyncStorage.getItem('isLoggedIn');
    return loggedIn === 'true';
  } catch (error) {
    console.log('Error al verificar sesión activa', error);
    return false;
  }
};


export const isUserLoggedIn = async (username, password) => {
  try {
    const storedUsers = await AsyncStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    return users.some(
      (user) => user.username === username && user.password === password
    );
    
  } catch (error) {
    console.log('Error al verificar usuario registrado', error);
    return false;
  }
};
