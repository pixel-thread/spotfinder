import { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';

// Define proper type for parking data
type ParkingDetail = {
  id: number;
  name: string;
  address: string;
  price: string;
  rating: number;
  distance: string;
  available: number;
  totalSpots: number;
  openHours: string;
  features: string[];
  description: string;
  image: string;
  gallery: string[];
};

type ParkingDataType = {
  [key: string]: ParkingDetail;
};

// Mock data - in a real app, you would fetch this from an API
const parkingData: ParkingDataType = {
  '1': {
    id: 1,
    name: 'Downtown Parking Garage',
    address: '123 Main St, Downtown',
    price: '$5/hr',
    rating: 4.5,
    distance: '0.3 mi',
    available: 12,
    totalSpots: 150,
    openHours: '24/7',
    features: ['Covered', 'Security', 'EV Charging'],
    description:
      'Conveniently located in the heart of downtown, this parking garage offers secure parking with 24/7 access and security monitoring.',
    image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3',
    gallery: [
      'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1590674899484-13d6c7094a9f?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3',
    ],
  },
  '2': {
    id: 2,
    name: 'City Center Lot',
    address: '456 Park Ave, City Center',
    price: '$3/hr',
    rating: 4.2,
    distance: '0.7 mi',
    available: 8,
    totalSpots: 75,
    openHours: '6:00 AM - 11:00 PM',
    features: ['Outdoor', 'CCTV', 'Wheelchair Access'],
    description:
      'Affordable parking in the city center with easy access to shopping and restaurants. Well-lit with security cameras.',
    image: 'https://images.unsplash.com/photo-1590674899484-13d6c7094a9f?ixlib=rb-4.0.3',
    gallery: [
      'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3',
    ],
  },
};

export default function ParkingDetailScreen() {
  const { id: parkingId } = useLocalSearchParams();
  const router = useRouter();
  const [parking, setParking] = useState<ParkingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const id =
        typeof parkingId === 'string' ? parkingId : Array.isArray(parkingId) ? parkingId[0] : null;
      if (id && parkingData[id]) {
        setParking(parkingData[id]);
      }
      setLoading(false);
    }, 500);
  }, [parkingId]);

  if (loading) {
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
            <Typography variant="subtitle" className="mb-2 font-semibold">
              Description
            </Typography>
            <Typography className="text-gray-600">{parking.description}</Typography>
          </View>

          {/* Features */}
          <View className="mt-6">
            <Typography variant="subtitle" className="mb-2 font-semibold">
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
              <Typography variant="subtitle" className="mb-2 font-semibold">
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
          Book Parking
        </Button>
      </View>
    </Container>
  );
}
