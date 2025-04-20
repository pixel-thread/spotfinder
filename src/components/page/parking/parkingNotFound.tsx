import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const ParkingNotFoundCard = () => {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <Ionicons name="car-outline" size={60} color="#d1d5db" />
      <Text className="mt-4 text-center text-gray-500">No parking spots found.</Text>
    </View>
  );
};
