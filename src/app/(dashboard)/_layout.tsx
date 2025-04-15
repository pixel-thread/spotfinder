import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '~/src/hooks/auth/useAuth';

export default function DashboardLayout() {
  const { user } = useAuth();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          headerRight: () => <Ionicons name="chatbox-outline" size={24} color="#4c669f" />,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
      {/* Hide the parking folder from tabs */}
      <Tabs.Screen
        name="(parking)"
        options={{
          href: null, // This prevents the tab from being accessible via tab bar
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
