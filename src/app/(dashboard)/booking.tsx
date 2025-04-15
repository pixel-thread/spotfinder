import { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Link, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { z } from 'zod';
import { parkingSchema } from '~/src/utils/validation/parking';
type ParkingDetail = z.infer<typeof parkingSchema>;
const BookingPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Nearest', 'Cheapest', 'Highest Rated', 'Most Available'];

  const { isLoading, data: parking } = useQuery({
    queryKey: ['parking'],
    queryFn: () => http.get<ParkingDetail[]>(`/parking`),
    select: (data) => data.data,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const filteredParking = parking?.filter(
    (parking) =>
      parking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parking.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Container className="flex-1 items-center justify-center">
        <Typography variant="heading">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container className="flex-1">
      {/* Header */}
      <View className="mt-2 rounded-lg bg-white p-4">
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
        {filteredParking && filteredParking.length > 0 ? (
          filteredParking.map((parking) => (
            <Link href={`/parking/${parking.id}`} key={parking.id} asChild>
              <TouchableOpacity
                key={parking.id}
                className="mb-4 overflow-hidden rounded-xl bg-white shadow-sm">
                <Image source={{ uri: parking.image }} className="h-40 w-full" resizeMode="cover" />
                <View className="p-4">
                  <View className="mb-1 flex-row items-center justify-between">
                    <Text className="text-lg font-bold text-gray-900">{parking.name}</Text>
                    <View className="flex-row items-center">
                      <Ionicons
                        name={
                          user && parking && parking?.rating?.includes(user?.id)
                            ? 'star'
                            : 'star-outline'
                        }
                        size={16}
                        color="#f59e0b"
                      />
                      <Text className="ml-1 text-gray-700">{parking?.rating?.length}</Text>
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
                </View>
              </TouchableOpacity>
            </Link>
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
