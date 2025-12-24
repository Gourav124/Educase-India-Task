import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Homescreen from './src/screens/Homescreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCart } from './src/redux/cartSlice';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          dispatch(setCart(JSON.parse(savedCart)));
        }
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    };
    loadCart();
  }, [dispatch]);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart", error);
      }
    };
    saveCart();
  }, [cartItems]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Homescreen} />
        <Stack.Screen name='Detail' component={ProductDetailScreen} />
        <Stack.Screen name='Cart' component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
