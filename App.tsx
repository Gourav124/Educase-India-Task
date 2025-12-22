import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Homescreen from './src/screens/Homescreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'screenOptions={{headerShown:false}}>
      <Stack.Screen name='Home' component={Homescreen}/>
      <Stack.Screen name='Detail' component={ProductDetailScreen}/>
      <Stack.Screen name='Cart' component={CartScreen}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App
