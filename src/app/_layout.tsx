import { Stack } from 'expo-router';
import { Suspense, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

import { MainProviders } from '~/src/components/providers';
import { useColorScheme } from 'nativewind';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-white-50 flex-1 dark:bg-gray-950">
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
