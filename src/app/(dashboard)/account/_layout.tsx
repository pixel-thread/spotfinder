import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function ProfileLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: 'Partners',
        headerBackButtonDisplayMode: 'generic',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: isDark ? 'rgb(23, 37, 84, 0.3)' : '#ffffff',
        },
        headerTintColor: isDark ? '#f3f4f6' : '#111827',
        headerTitleStyle: {
          color: isDark ? '#f3f4f6' : '#111827',
        },
        contentStyle: {
          backgroundColor: isDark ? '#111827' : '#f9fafb',
        },
      }}
    />
  );
}
