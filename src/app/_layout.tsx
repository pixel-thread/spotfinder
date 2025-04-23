import { Stack } from 'expo-router';
import { Suspense } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

import { MainProviders } from '~/src/components/providers';
import { useColorScheme } from 'nativewind';

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();
  setColorScheme('system');
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-950">
        <StatusBar />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
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
