import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';

import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';

const quickActions = [
  { label: 'Find Spot', icon: 'car', bg: 'bg-blue-100', color: 'text-blue-600' },
  { label: 'History', icon: 'time-outline', bg: 'bg-orange-100', color: 'text-orange-600' },
  { label: 'Payment', icon: 'card-outline', bg: 'bg-green-100', color: 'text-green-600' },
];

const recentSpots = [
  { name: 'Downtown Garage', time: 'Yesterday, 5:00 PM', price: '$8.50', distance: '0.3 mi' },
  { name: 'City Center Lot', time: 'Mon, 2:15 PM', price: '$5.25', distance: '0.8 mi' },
  { name: 'Harbor View Parking', time: 'Sun, 10:30 AM', price: '$12.00', distance: '1.2 mi' },
];

const newParkingOptions = [
  {
    id: 1,
    name: 'Central Mall Parking',
    price: '$4/hr',
    distance: '0.5 mi',
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'Riverside Garage',
    price: '$6/hr',
    distance: '1.2 mi',
    image: 'https://images.unsplash.com/photo-1590674899484-13d6c7094a9f?ixlib=rb-4.0.3',
  },
  {
    id: 3,
    name: 'Tech Park Lot',
    price: '$3/hr',
    distance: '0.8 mi',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3',
  },
];

const activeParking = [
  { id: 1, name: 'Downtown Garage', timeLeft: '1h 23m left', spot: 'A-12' },
  { id: 2, name: 'City Center', timeLeft: '45m left', spot: 'B-08' },
  { id: 2, name: 'City Center', timeLeft: '45m left', spot: 'B-08' },
  { id: 2, name: 'City Center', timeLeft: '45m left', spot: 'B-08' },
  { id: 2, name: 'City Center', timeLeft: '45m left', spot: 'B-08' },
  { id: 2, name: 'City Center', timeLeft: '45m left', spot: 'B-08' },
  { id: 2, name: 'City Center', timeLeft: '45m left', spot: 'B-08' },
  { id: 2, name: 'City Center', timeLeft: '45m left', spot: 'B-08' },
];

const HomePage = () => {
  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="my-2 rounded-lg bg-white p-4">
          <View className="my-6 flex-row items-center justify-between rounded-lg">
            <View>
              <Typography variant="heading">Hello 👋</Typography>
              <Typography variant="heading" className="text-2xl font-bold">
                Welcome Back
              </Typography>
            </View>
            <TouchableOpacity className="rounded-full bg-gray-100 p-2">
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View className="mb-6 flex-row justify-between gap-2">
            {quickActions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                className={`flex-1 items-center justify-center rounded-xl p-3 ${action.bg}`}>
                <Ionicons name={action.icon as any} size={24} color="#333" />
                <Typography className={`mt-1 text-sm font-medium ${action.color}`}>
                  {action.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Active Parking Section */}
        {activeParking.length > 0 && (
          <View className="mb-6">
            <Typography className="mb-3 text-lg font-medium text-gray-800">
              Active Parking
            </Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {activeParking.map((parking, idx) => (
                <TouchableOpacity
                  key={`active-${idx}`}
                  className="mr-3 w-64 rounded-xl bg-blue-500 p-4">
                  <View className="flex-row items-center justify-between">
                    <View className="rounded-full bg-white/20 p-2">
                      <Ionicons name="time" size={20} color="white" />
                    </View>
                    <Typography className="font-bold text-white">{parking.timeLeft}</Typography>
                  </View>
                  <Typography className="mt-3 text-lg font-bold text-white">
                    {parking.name}
                  </Typography>
                  <View className="mt-2 flex-row items-center">
                    <Ionicons name="car-outline" size={16} color="white" />
                    <Typography className="ml-1 text-white">Spot {parking.spot}</Typography>
                  </View>
                  <Button className="mt-3 bg-white" size="sm">
                    <Typography className="text-blue-500">Extend Time</Typography>
                  </Button>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Promo / CTA Section */}
        <View className="mb-6 rounded-2xl bg-blue-50 p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Typography className="text-lg font-semibold text-gray-800">
              Looking for parking?
            </Typography>
            <Ionicons name="search" size={22} color="#4c669f" />
          </View>
          <Typography className="mb-3 text-sm text-gray-600">
            Find the perfect spot near your destination
          </Typography>
          <Button className="w-full bg-blue-600" size="lg">
            Find Parking Now
          </Button>
        </View>

        {/* New Parking Options */}
        <View className="mb-6">
          <Typography className="mb-3 text-lg font-medium text-gray-800">
            New Parking Options
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newParkingOptions.map((parking, idx) => (
              <TouchableOpacity
                key={`new-${idx}`}
                className="mr-3 w-56 overflow-hidden rounded-xl bg-white shadow-sm">
                <View className="h-32 w-full bg-gray-200">
                  {parking.image && (
                    <Image
                      source={{ uri: parking.image }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  )}
                </View>
                <View className="p-3">
                  <Typography className="font-semibold text-gray-900">{parking.name}</Typography>
                  <View className="mt-1 flex-row items-center justify-between">
                    <Typography className="font-bold text-blue-600">{parking.price}</Typography>
                    <Typography className="text-sm text-gray-500">{parking.distance}</Typography>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Spots */}
        <Typography className="mb-4 text-lg font-medium text-gray-800">Recent Spots</Typography>
        {recentSpots.map((item, index) => (
          <TouchableOpacity
            key={`recent-${index}`}
            className="mb-3 flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-100 p-2">
                <Ionicons name="car" size={22} color="#4c669f" />
              </View>
              <View>
                <Typography className="font-semibold text-gray-900">{item.name}</Typography>
                <Typography className="text-sm text-gray-600">{item.time}</Typography>
              </View>
            </View>
            <View className="items-end">
              <Typography className="font-bold text-blue-600">{item.price}</Typography>
              <Typography className="text-xs text-gray-500">{item.distance}</Typography>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add padding at the bottom for better scrolling experience */}
        <View className="h-6" />
      </ScrollView>
    </Container>
  );
};

export default HomePage;
