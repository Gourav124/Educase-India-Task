import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQty, increaseQty } from '../redux/cartSlice';

const ProductDetailScreen = ({ route, navigation }: any) => {

  const { item } = route.params;
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dff9fb' }}>
      <View style={{ flex: 1, padding: 16, backgroundColor: '#dff9fb' }}>

        <View style={{ position: 'absolute' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#ddd',
              marginLeft: 15
            }}>
            <FontAwesome name='arrow-left' size={20} />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 50, borderRadius: 8 }}>
          <Image source={{ uri: item.thumbnail }} style={{ width: 250, height: 250 }} />
        </View>

        <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>{item.title}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#27ae60' }}>${item.price}</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Description</Text>
        <Text style={{ fontSize: 18, fontWeight: 'semibold', marginTop: 10 }}>{item.description}</Text>

        <TouchableOpacity
           onPress={() => dispatch(addToCart(item))}  
          style={{
            position: 'absolute',
            bottom: 8,
            backgroundColor: '#3498db',
            borderRadius: 25,
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: '#ddd',
            marginLeft: 50,
            marginBottom: 20
          }}>
          <Text style={{ color: '#fff' }}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
          style={{
            position: 'absolute',
            bottom: 8,
            backgroundColor: '#3498db',
            borderRadius: 25,
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: '#ddd',
            right: 0,
            marginRight: 50,
            marginBottom: 20
          }}>
          <Text style={{ color: '#fff' }}>View Cart</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default ProductDetailScreen