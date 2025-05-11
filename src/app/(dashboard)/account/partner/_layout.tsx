import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: 'Partners',
        headerBackButtonDisplayMode: 'generic',
      }}
    />
  );
}
