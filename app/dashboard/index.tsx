import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Ionicons } from '@expo/vector-icons';

const HomePage = () => {
  return (
    <Container className="flex-1 bg-gray-50">
      {/* Header with gradient background */}

      <View className="mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-lg text-gray-200">Hello 👋</Text>
          <Text className="text-2xl font-bold text-white">Welcome Back</Text>
        </View>
        <TouchableOpacity className="rounded-full bg-white/20 p-2">
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Quick actions */}
      <View className="mt-4 flex-row justify-between">
        <TouchableOpacity className="mr-2 flex-1 items-center rounded-xl bg-white/20 p-3">
          <Ionicons name="car" size={24} color="white" />
          <Text className="mt-1 font-medium text-white">Find Spot</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mx-2 flex-1 items-center rounded-xl bg-white/20 p-3">
          <Ionicons name="time-outline" size={24} color="white" />
          <Text className="mt-1 font-medium text-white">History</Text>
        </TouchableOpacity>
        <TouchableOpacity className="ml-2 flex-1 items-center rounded-xl bg-white/20 p-3">
          <Ionicons name="card-outline" size={24} color="white" />
          <Text className="mt-1 font-medium text-white">Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View className="-mt-5 px-4">
        {/* Find Parking CTA Card */}
        <View className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-gray-800">Looking for parking?</Text>
            <Ionicons name="search" size={22} color="#4c669f" />
          </View>
          <Text className="mb-3 text-gray-600">Find the perfect spot near your destination</Text>
          <Button className="w-full bg-blue-600" size="lg">
            Find Parking Now
          </Button>
        </View>

        {/* Recent Parking Spots */}
        <Text className="mb-4 text-lg font-medium text-gray-800">Recent Spots</Text>
        <ScrollView className="space-y-3" showsVerticalScrollIndicator={false}>
          {[
            {
              name: 'Downtown Garage',
              time: 'Yesterday, 5:00 PM',
              price: '$8.50',
              distance: '0.3 mi',
            },
            { name: 'City Center Lot', time: 'Mon, 2:15 PM', price: '$5.25', distance: '0.8 mi' },
            {
              name: 'Harbor View Parking',
              time: 'Sun, 10:30 AM',
              price: '$12.00',
              distance: '1.2 mi',
            },
          ].map((spot, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <View className="flex-row items-center">
                <View className="mr-3 rounded-full bg-blue-100 p-2">
                  <Ionicons name="car" size={22} color="#4c669f" />
                </View>
                <View>
                  <Text className="font-semibold text-gray-900">{spot.name}</Text>
                  <Text className="text-sm text-gray-600">{spot.time}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-bold text-blue-600">{spot.price}</Text>
                <Text className="text-xs text-gray-500">{spot.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

export default HomePage;
