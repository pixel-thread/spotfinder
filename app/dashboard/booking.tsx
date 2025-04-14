import { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { useAuth } from '~/src/hooks/auth/useAuth';

const parkingData = [
  {
    id: 1,
    name: 'Downtown Parking Garage',
    address: '123 Main St, Downtown',
    price: '$5/hr',
    rating: 4.5,
    distance: '0.3 mi',
    available: 12,
    image:
      'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcmtpbmclMjBnYXJhZ2V8ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: 2,
    name: 'City Center Lot',
    address: '456 Park Ave, City Center',
    price: '$3/hr',
    rating: 4.2,
    distance: '0.7 mi',
    available: 8,
    image:
      'https://images.unsplash.com/photo-1590674899484-13d6c7094a9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFya2luZyUyMGxvdHxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Harbor View Parking',
    address: '789 Ocean Blvd, Harbor District',
    price: '$7/hr',
    rating: 4.8,
    distance: '1.2 mi',
    available: 25,
    image:
      'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFya2luZyUyMGxvdHxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    id: 4,
    name: 'Central Station Parking',
    address: '321 Transit Way, Central District',
    price: '$4/hr',
    rating: 4.0,
    distance: '0.5 mi',
    available: 5,
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBhcmtpbmclMjBsb3R8ZW58MHx8MHx8&w=1000&q=80',
  },
];

const BookingPage = () => {
  const { onLogout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Nearest', 'Cheapest', 'Highest Rated', 'Most Available'];

  const filteredParking = parkingData.filter(
    (parking) =>
      parking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parking.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 pb-4 pt-6">
        <Text className="mb-4 text-xl font-bold text-gray-900">Find Parking</Text>

        {/* Search Bar */}
        <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 px-3 py-2">
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            className="ml-2 flex-1 text-gray-800"
            placeholder="Search for parking locations"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              className={`mr-2 rounded-full px-4 py-2 ${
                selectedFilter === filter ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                className={`${
                  selectedFilter === filter ? 'text-white' : 'text-gray-700'
                } font-medium`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Parking List */}
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {filteredParking.length > 0 ? (
          filteredParking.map((parking) => (
            <TouchableOpacity
              key={parking.id}
              className="mb-4 overflow-hidden rounded-xl bg-white shadow-sm">
              <Image source={{ uri: parking.image }} className="h-40 w-full" resizeMode="cover" />
              <View className="p-4">
                <View className="mb-1 flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-gray-900">{parking.name}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#f59e0b" />
                    <Text className="ml-1 text-gray-700">{parking.rating}</Text>
                  </View>
                </View>

                <Text className="mb-2 text-gray-600">{parking.address}</Text>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="pricetag-outline" size={16} color="#3b82f6" />
                    <Text className="ml-1 font-semibold text-blue-600">{parking.price}</Text>
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={16} color="#6b7280" />
                    <Text className="ml-1 text-gray-600">{parking.distance}</Text>
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="car-outline" size={16} color="#10b981" />
                    <Text className="ml-1 text-green-600">{parking.available} spots</Text>
                  </View>
                </View>

                <Button className="mt-3 w-full bg-blue-500">Book Now</Button>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="flex-1 items-center justify-center py-10">
            <Ionicons name="car-outline" size={60} color="#d1d5db" />
            <Text className="mt-4 text-center text-gray-500">
              No parking spots found matching your search.
            </Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default BookingPage;
