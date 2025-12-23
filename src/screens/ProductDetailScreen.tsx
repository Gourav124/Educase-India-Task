import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailScreen = ({ route, navigation }: any) => {

  const { item } = route.params;

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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{item.title}</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#27ae60' }}>${item.price}</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Description</Text>
        <Text style={{ fontSize: 18, fontWeight: 'semibold', marginTop: 10 }}>{item.description}</Text>

      </View>
    </SafeAreaView>
  )
}

export default ProductDetailScreen