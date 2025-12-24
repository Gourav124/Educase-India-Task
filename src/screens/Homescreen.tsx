import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@react-native-vector-icons/fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Product = {
  id: number
  title: string
  description: string
  thumbnail: string
  price: string
  quantity: number
}

const Homescreen = ({ navigation }: any) => {

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQurey] = useState('');
  const [focused, setFocused] = useState(false);
  const CACHE_KEY = 'products';

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=1000&skip=10&select=title,price,thumbnail,description`
      );
      const json = await res.json();
      const items = json.products || [];
      setData(items);

      AsyncStorage.setItem(CACHE_KEY, JSON.stringify(items))
    } catch (error) {
      console.warn('Fetch error:', error);

      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        const cachedItems = JSON.parse(cached);
        setData(cachedItems);

      }
    } finally {
      setLoading(false);
    }
  }

  const searchProducts = (query: string) => {
    if (!query.trim()) {
      setData(data);
      return;
    }
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setData(filtered);
  }

  const handleSearch = () => {
    searchProducts(searchQuery);
  }

  useEffect(() => {
    searchProducts(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [])

  const renderFocusScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
        <FontAwesome name='search' color="#000" size={45} />
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#2c3e50', marginTop: 16, }}>Search for Photos</Text>
      </View>
    );
  }

  const renderEmptyState = () => {

    if (data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#2c3e50', marginTop: 16, }}>No Results Found</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dff9fb' }}>
      <View style={{ flex: 1, backgroundColor: '#dff9fb' }}>

        <View style={{ flexDirection: 'row', padding: 16 }}>
          <View style={{ flex: 1, position: 'relative' }}>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 15,
                paddingHorizontal: 16,
                paddingLeft: 40,
                paddingRight: 40,
                paddingVertical: 12,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#ddd',
              }}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQurey}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <FontAwesome name="search" size={20} color="#95a5a6" style={{ position: 'absolute', left: 12, top: 12 }} />
          </View>
          {focused ? (
            <TouchableOpacity
              onPress={() => { setFocused(false); Keyboard.dismiss(); setSearchQurey(''); setData(data); }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginLeft: 8
              }}
            >
              <Text style={{ color: '#3498db', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{
                backgroundColor: 'white',
                borderRadius: 15,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderWidth: 1,
                borderColor: '#ddd',
                marginLeft: 8
              }}>
              <FontAwesome name='cart-arrow-down' size={20} />
            </TouchableOpacity>
          )}
        </View>
        {
          loading && data.length == 0
            ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color={'#3498db'} />
            </View>
            : (
              focused && searchQuery.trim() === '' ? renderFocusScreen() : (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyState}
                    renderItem={({ item }) => (
                      <View style={{ backgroundColor: '#fff', borderRadius: 8, margin: 8, width: '45%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
                          <Image source={{ uri: item.thumbnail }} style={{ width: 180, height: 180 }} />
                          <Text style={{ margin: 8, fontSize: 15 }} numberOfLines={1}>{item.title}</Text>
                          <Text style={{ margin: 8, fontSize: 15 }}>${item.price}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              )
            )
        }
      </View>
    </SafeAreaView>
  )
}

export default Homescreen