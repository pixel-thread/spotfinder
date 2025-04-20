import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import http from '~/src/utils/https';
import { logger } from '~/src/utils/logger';
import { parkingSchema } from '~/src/utils/validation/parking';

type ParkingDetail = z.infer<typeof parkingSchema>;
export default function ParkingDetailScreen() {
  const { user } = useAuth();
  const { id: parkingId } = useLocalSearchParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { isLoading, data: parking } = useQuery({
    queryKey: ['parking', parkingId],
    queryFn: () => http.get<ParkingDetail>(`/parking/${parkingId}`),
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <Container className="flex-1 items-center justify-center bg-white">
        {/* Skeleton Header Image */}
        <View className="mb-4 h-80 w-full animate-pulse rounded-b-2xl bg-gray-200" />
        <View className="w-full px-4 py-5">
          {/* Skeleton Title and Rating */}
          <View className="mb-4 flex-row items-center justify-between">
            <View className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
            <View className="h-6 w-12 animate-pulse rounded bg-gray-200" />
          </View>
          {/* Skeleton Address */}
          <View className="mb-6 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          {/* Skeleton Key Info */}
          <View className="mb-6 flex-row justify-between">
            <View className="h-14 w-20 animate-pulse rounded-lg bg-gray-200" />
            <View className="h-14 w-20 animate-pulse rounded-lg bg-gray-200" />
            <View className="h-14 w-20 animate-pulse rounded-lg bg-gray-200" />
          </View>
          {/* Skeleton Description */}
          <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
          <View className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200" />
          <View className="mb-1 h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          {/* Skeleton Features */}
          <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
          <View className="mb-6 flex-row flex-wrap">
            <View className="mb-2 mr-2 h-7 w-20 animate-pulse rounded-full bg-gray-200" />
            <View className="mb-2 mr-2 h-7 w-16 animate-pulse rounded-full bg-gray-200" />
            <View className="mb-2 mr-2 h-7 w-24 animate-pulse rounded-full bg-gray-200" />
          </View>
          {/* Skeleton Gallery */}
          <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="mr-2 h-24 w-32 animate-pulse rounded-lg bg-gray-200" />
            <View className="mr-2 h-24 w-32 animate-pulse rounded-lg bg-gray-200" />
            <View className="mr-2 h-24 w-32 animate-pulse rounded-lg bg-gray-200" />
          </ScrollView>
          {/* Skeleton Additional Info */}
          <View className="mt-6 space-y-3 rounded-lg bg-gray-100 p-4">
            <View className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
            <View className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          </View>
        </View>
        {/* Skeleton Bottom Action Bar */}
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

  const handleImagePress = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container className="flex-1 bg-white">
      {/* Image Modal */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}>
        <View className="flex-1 items-center justify-center bg-black/90">
          <TouchableOpacity
            className="absolute right-6 top-12 z-10 rounded-full bg-black/50 p-2"
            onPress={closeImageModal}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              className="h-[70%] w-full"
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Image */}
        <View className="relative h-80 w-full">
          <Image source={{ uri: parking.image }} className="h-full w-full" resizeMode="cover" />
        </View>

        {/* Main Content */}
        <View className="px-4 py-5">
          {/* Title and Rating */}
          <View className="flex-row items-center justify-between">
            <Typography variant="heading" className="flex-1 text-2xl font-bold">
              {parking.name}
            </Typography>
            <View className="flex-row items-center rounded-lg bg-blue-50 px-2 py-1">
              <Ionicons
                name={user && parking.rating?.includes(user?.id) ? 'star' : 'star-outline'}
                size={16}
                color="#f59e0b"
              />
              <Typography className="ml-1 font-medium">{parking.rating?.length}</Typography>
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
              <Typography className="text-gray-500">Price/hr</Typography>
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
              <Ionicons name="location-outline" size={18} color="#3b82f6" />
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
                  <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
                    <Image
                      source={{ uri: image }}
                      className="mr-2 h-24 w-32 rounded-lg"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
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
