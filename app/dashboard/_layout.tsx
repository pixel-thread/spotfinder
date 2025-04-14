import { Home, Car, User } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router/tabs';

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tabs.Screen
        name="/(tabs)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <Car color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  );
}
