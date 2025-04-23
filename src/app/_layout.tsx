import { Stack } from 'expo-router';
import { Suspense } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

import { MainProviders } from '~/src/components/providers';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-white-50 flex-1 dark:bg-gray-950">
        {/* <StatusBar className="bg-white dark:bg-gray-950" /> */}
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
