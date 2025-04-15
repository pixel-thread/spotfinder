import { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { ParkingDetail, parkingData } from '~/src/libs/constants/parking/data';
import { useQuery } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { logger } from '~/src/utils/logger';

export default function ParkingDetailScreen() {
  const { id: parkingId } = useLocalSearchParams();
  const router = useRouter();

  const {
    isLoading,
    data: parking,
    isError,
    error,
  } = useQuery({
    queryKey: ['parking', parkingId],
    queryFn: () => http.get<ParkingDetail>(`/parking/${parkingId}`),
    select: (data) => data.data,
  });

  if (isError) {
    logger({ message: error.message, error });
    return (
      <Container className="flex-1 items-center justify-center">
        <Typography>Error...</Typography>
      </Container>
    );
  }
  if (isLoading) {
    return (
      <Container className="flex-1 items-center justify-center">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!parking) {
    return (
      <Container className="flex-1 items-center justify-center">
        <Typography>Parking not found</Typography>
        <Button className="mt-4" onPress={() => router.back()}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Image */}
        <View className="relative h-64 w-full">
          <Image source={{ uri: parking.image }} className="h-full w-full" resizeMode="cover" />
          <TouchableOpacity
            className="absolute left-4 top-12 rounded-full bg-white/80 p-2"
            onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="px-4 py-5">
          {/* Title and Rating */}
          <View className="flex-row items-center justify-between">
            <Typography variant="heading" className="flex-1 text-2xl font-bold">
              {parking.name}
            </Typography>
            <View className="flex-row items-center rounded-lg bg-blue-50 px-2 py-1">
              <Ionicons name="star" size={16} color="#f59e0b" />
              <Typography className="ml-1 font-medium">{parking.rating}</Typography>
            </View>
          </View>

          {/* Address */}
          <View className="mt-2 flex-row items-center">
            <Ionicons name="location-outline" size={18} color="#6b7280" />
            <Typography className="ml-1 text-gray-600">{parking.address}</Typography>
          </View>

          {/* Key Info */}
          <View className="mt-6 flex-row justify-between">
            <View className="items-center rounded-lg bg-gray-50 px-4 py-3">
              <Typography className="text-gray-500">Price</Typography>
              <Typography className="text-lg font-bold text-blue-600">{parking.price}</Typography>
            </View>
            <View className="items-center rounded-lg bg-gray-50 px-4 py-3">
              <Typography className="text-gray-500">Available</Typography>
              <Typography className="text-lg font-bold text-green-600">
                {parking.available}
              </Typography>
            </View>
            <View className="items-center rounded-lg bg-gray-50 px-4 py-3">
              <Typography className="text-gray-500">Distance</Typography>
              <Typography className="text-lg font-bold">{parking.distance}</Typography>
            </View>
          </View>

          {/* Description */}
          <View className="mt-6">
            <Typography variant="caption" className="mb-2 font-semibold">
              Description
            </Typography>
            <Typography className="text-gray-600">{parking.description}</Typography>
          </View>

          {/* Features */}
          <View className="mt-6">
            <Typography variant="caption" className="mb-2 font-semibold">
              Features
            </Typography>
            <View className="flex-row flex-wrap">
              {parking.features.map((feature, index) => (
                <View
                  key={index}
                  className="mb-2 mr-2 flex-row items-center rounded-full bg-blue-50 px-3 py-1">
                  <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
                  <Typography className="ml-1 text-blue-700">{feature}</Typography>
                </View>
              ))}
            </View>
          </View>

          {/* Gallery */}
          {parking.gallery && parking.gallery.length > 0 && (
            <View className="mt-6">
              <Typography variant="caption" className="mb-2 font-semibold">
                Gallery
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {parking.gallery.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    className="mr-2 h-24 w-32 rounded-lg"
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Additional Info */}
          <View className="mt-6 space-y-3 rounded-lg bg-gray-50 p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={18} color="#6b7280" />
                <Typography className="ml-2 text-gray-700">Opening Hours</Typography>
              </View>
              <Typography className="font-medium">{parking.openHours}</Typography>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="car-outline" size={18} color="#6b7280" />
                <Typography className="ml-2 text-gray-700">Total Spots</Typography>
              </View>
              <Typography className="font-medium">{parking.totalSpots}</Typography>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="border-t border-gray-200 bg-white p-4">
        <Button className="w-full bg-blue-600" size="lg">
          Book Now
        </Button>
      </View>
    </Container>
  );
}
