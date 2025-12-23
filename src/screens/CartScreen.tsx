import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@react-native-vector-icons/fontawesome'

const CartScreen = ({ navigation }: any) => {
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
      </View>
    </SafeAreaView>
  )
}

export default CartScreen