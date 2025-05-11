import { Ionicons } from '@expo/vector-icons';
import { Link, Route } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View, Text, Image } from 'react-native';
import { z } from 'zod';

import { Typography } from '../../ui/typography';

import { useAuth } from '~/src/hooks/auth/useAuth';
import { parkingSchema } from '~/src/utils/validation/parking';

type ParkingDetail = z.infer<typeof parkingSchema>;

type ParkingCardProps = {
  parking: ParkingDetail;
};

export const ParkingCard = ({ parking }: ParkingCardProps) => {
  const { user } = useAuth();
  const { colorScheme } = useColorScheme(); // Add this import
  const isOwner = user?.id === parking.userId;
  const pathUrl = isOwner
    ? `/(dashboard)/account/partner/update/${parking.id}`
    : `/(dashboard)/parking/${parking.id}`;
  return (
    <Link
      href={pathUrl as Route}
      key={parking.id}
      className="mb-4 w-full overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
      <Image source={{ uri: parking.image }} className="h-40 w-full" resizeMode="cover" />
      <View className="p-4">
        <Typography className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {parking.name}
        </Typography>
        <View className="mt-1 flex-row items-center">
          <Ionicons
            name="location-outline"
            size={16}
            color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
          />
          <Typography className="ml-1 text-gray-500 dark:text-gray-400">
            {parking.address}
          </Typography>
        </View>

        <View className="mb-1 w-full flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-900">{parking.name}</Text>
          <View className="flex-row items-center">
            <Ionicons
              name={
                user && parking && parking?.rating?.includes(user?.id) ? 'star' : 'star-outline'
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
            <Text className="ml-1 font-semibold text-blue-600">{parking.price} /hr</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text className="ml-1 text-gray-600">{parking.distance}</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="car-outline" size={16} color="#10b981" />
            <Text className="ml-1 text-green-600">
              {parking.slots?.filter((slot) => slot.isOccupied === false).length || 0}
              <Typography className="text-gray-500">/{parking.slots?.length} spots</Typography>
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
};
