import { Home, Car, User } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router/tabs';
import '../../global.css';
export default function DashboardLayout() {
  return (
    <Tabs screenOptions={{ tabBarLabel: () => null, headerShown: false }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ color }) => <Home color={color} /> }} />
      <Tabs.Screen name="bookings" options={{ tabBarIcon: ({ color }) => <Car color={color} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <User color={color} /> }} />
    </Tabs>
  );
}
