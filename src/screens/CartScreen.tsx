import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@react-native-vector-icons/fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQty, increaseQty, removeFromCart } from '../redux/cartSlice'

const CartScreen = ({ navigation }: any) => {

  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = useSelector((state: any) =>
    state.cart.items.reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0
    )
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dff9fb' }}>
      <View style={{ flex: 1, padding: 16, backgroundColor: '#dff9fb' }}>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#ddd',
              marginRight: 15
            }}>
            <FontAwesome name='arrow-left' size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My Cart</Text>
        </View>

        <View style={{ flex: 1 }}>
          {cartItems.length > 0 ? (
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 15, padding: 10, borderRadius: 15, alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
                  
                  <View>
                    <Image source={{ uri: item.thumbnail }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => dispatch(decreaseQty(item.id))}
                        style={{ backgroundColor: '#f0f0f0', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' }}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => dispatch(increaseQty(item.id))}
                        style={{ backgroundColor: '#f0f0f0', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }} numberOfLines={2}>{item.title}</Text>
                      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={{ padding: 5 }}>
                        <FontAwesome name="trash" size={20} color="#e74c3c" />
                      </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#27ae60', fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>${item.price}</Text>
                  </View>

                </View>
              )}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name="shopping-cart" size={64} color="#ccc" />
              <Text style={{ fontSize: 18, color: '#888', marginTop: 20 }}>Your cart is empty</Text>
            </View>
          )}
        </View>

        {cartItems.length > 0 && (
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 10
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <Text style={{ fontSize: 18, color: '#888' }}>Total Price:</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2c3e50' }}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default CartScreen