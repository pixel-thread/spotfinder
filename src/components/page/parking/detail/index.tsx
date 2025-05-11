import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Modal, Settings } from 'react-native';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { ParkingDetailSkeleton } from '~/src/components/page/parking/detail/parkingDetailSkeleton';
import { ParkingNotFoundCard } from '~/src/components/page/parking/parkingNotFound';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';
import { cn } from '~/src/libs';
import { ParkingDetailFooter } from './parkingDetailFooter';

type ParkingDetail = z.infer<typeof parkingSchema>;

export const ParkingDetailView = ({ parkingId }: { parkingId: string }) => {
  const { user } = useAuth();
  const { isLoading, data: parking } = useQuery({
    queryKey: ['parking', parkingId],
    queryFn: () => http.get<ParkingDetail>(`/parking/${parkingId}`),
    select: (data) => data?.data,
  });

  const {
    data: rating,
    isLoading: isRatingLoading,
    refetch,
  } = useQuery({
    queryKey: ['parking', 'rating', parkingId],
    queryFn: () =>
      http.get<ParkingDetail['rating']>(
        PARKING_ENDPOINT.PUT_PARKING_UPDATE_RATING.replace(':id', parkingId.toString() || '')
      ),
    select: (data) => data?.data,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { mutate: rateParking } = useMutation({
    mutationKey: ['parking', 'rating', parkingId],
    mutationFn: () =>
      http.put(PARKING_ENDPOINT.PUT_PARKING_UPDATE_RATING.replace(':id', parking?.id || ''), {}),
    onSuccess: () => refetch(),
  });

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return <ParkingDetailSkeleton />;
  }

  if (!parking) {
    return <ParkingNotFoundCard />;
  }
  return (
    <Container className="flex-1 bg-white">
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="slide"
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
          <Image source={{ uri: parking?.image }} className="h-full w-full" resizeMode="cover" />
        </View>

        {/* Main Content */}
        <View className="px-4 py-5">
          {/* Title and Rating */}
          <View className="flex-row items-center justify-between">
            <Typography variant="heading" className="flex-1 text-2xl font-bold">
              {parking.name}
            </Typography>
            <View className="flex-row items-center rounded-lg bg-blue-50 px-2 py-1">
              <TouchableOpacity
                disabled={isRatingLoading || isLoading || !user}
                onPress={() => rateParking()}>
                <Ionicons
                  name={user && rating?.includes(user?.id) ? 'star' : 'star-outline'}
                  size={16}
                  color="#f59e0b"
                />
              </TouchableOpacity>
              <Typography className="ml-1 font-medium">{rating?.length}</Typography>
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
              <Typography
                className={cn(
                  parking.slots?.filter((val) => val.isOccupied === false).length === 0
                    ? 'text-red-600'
                    : 'text-green-600'
                )}>
                {parking.slots?.filter((val) => val.isOccupied === false).length}/
                {parking.slots?.length}
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
              <Typography className="font-medium">{parking.slots?.length}</Typography>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      {parking.id && <ParkingDetailFooter id={parking.id} />}
    </Container>
  );
};

