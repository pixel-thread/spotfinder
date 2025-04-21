import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Suspense } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

import { MainProviders } from '~/src/components/providers';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-200">
        <StatusBar
          barStyle="dark-content"
          className={colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
          <Suspense>
            <MainProviders>
              <Stack
                screenOptions={{ headerShown: false, headerBackButtonDisplayMode: 'generic' }}
              />
            </MainProviders>
          </Suspense>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
