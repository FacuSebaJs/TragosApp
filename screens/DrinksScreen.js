import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { CartContext } from './CartContext';
import { logoutUser } from '../utils/auth';
import { useNavigation } from '@react-navigation/native';


const drinks = [
  { name: 'Fernet', price: 2500, image: require('../assets/fernet.png') },
  { name: 'Daikiri', price: 3000, image: require('../assets/daikiri.png') },
  { name: 'Mojito', price: 2800, image: require('../assets/mojito.png') },
  { name: 'Caipirinha', price: 2700, image: require('../assets/caipirinha.png') },
  { name: 'Caipiroska', price: 2900, image: require('../assets/caipiroska.png') },
  { name: 'Cerveza', price: 1500, image: require('../assets/cerveza.png') },
];

export default function DrinksScreen() {
    const navigation = useNavigation();

  const { dispatch, state } = useContext(CartContext);

  const handleAddToCart = (drink) => {
    dispatch({ type: 'ADD_TO_CART', payload: drink });
    console.log("Estado del carrito:", state);
    
  };

  return (
    <ImageBackground source={require('../assets/playa-bg.png')} style={styles.background}>
  
      {/* Botón de conservadora con contador */}
      <TouchableOpacity
  style={styles.cartButton}
  onPress={() => navigation.navigate('Cart')}
>
        <Image source={require('../assets/conservadora_transparente.png')} style={styles.cartIcon} />
        {state.items.length > 0 && (
          <View style={styles.badge}>
          <Text style={styles.badgeText}>{state.items.length}</Text>
        </View>
        
        )}
      </TouchableOpacity>
  
      {/* Botón de logout */}
      <TouchableOpacity onPress={async () => {
        await logoutUser();
        navigation.replace('Login');
      }} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
  
      {/* Lista de tragos */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Elegí tu trago</Text>
        {drinks.map((drink, index) => (
          <View key={index} style={styles.card}>
            <Image source={drink.image} style={styles.image} />
            <Text style={styles.name}>{drink.name}</Text>
            <Text style={styles.price}>${drink.price}</Text>
            <View style={styles.buttonGroup}>
  <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(drink)}>
    <Image source={require('../assets/cocktail-icon.png')} style={styles.icon} />
    <Text style={styles.buttonText}>Agregar</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(drink)}>
    <Text style={styles.buttonText}>Quitar</Text>
  </TouchableOpacity>
</View>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={() => handleRemoveFromCart(drink)}>
  <Text style={styles.buttonText}>Quitar</Text>
</TouchableOpacity>

          </View>
        ))}
      </ScrollView>
  
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
    minHeight: '100%',
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  price: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF0050',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  logoutButton: {
    backgroundColor: '#FF0050',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartButton: {
  position: 'absolute',
  top: 40,
  right: 20,
  zIndex: 10,
},
cartIcon: {
  width: 70,
  height: 70,
  resizeMode: 'contain',
},
badge: {
  position: 'absolute',
  top: 25,
  right: 40,
  backgroundColor: 'rgba(0,0,0,0.6)',
  borderRadius: 12,
  paddingHorizontal: 6,
  paddingVertical: 2,
},
badgeText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
  textAlign: 'center'
}

  
});
