import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function ProfileLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: 'Account',
        headerBackButtonDisplayMode: 'generic',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
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
