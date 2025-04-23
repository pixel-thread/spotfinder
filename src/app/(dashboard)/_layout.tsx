import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function DashboardLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarPosition: 'bottom',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        },
        tabBarActiveTintColor: isDark ? '#60a5fa' : '#3b82f6',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="parking"
        options={{
          href: '/parking',
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
