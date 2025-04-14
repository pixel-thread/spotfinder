import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { Ionicons } from '@expo/vector-icons';

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

const HomePage = () => {
  return (
    <Container className="flex-1">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <View>
          <Typography variant="heading">Hello 👋</Typography>
          <Typography variant="heading" className="text-2xl font-bold">
            Welcome Back
          </Typography>
        </View>
        <TouchableOpacity className="rounded-full bg-gray-100 p-2">
          <Ionicons name="notifications-outline" size={24} color="#4c669f" />
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

      {/* Recent Spots */}
      <Typography className="mb-4 text-lg font-medium text-gray-800">Recent Spots</Typography>
      <FlatList
        data={recentSpots}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        renderItem={({ item }) => (
          <TouchableOpacity className="mb-3 flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
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
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default HomePage;
