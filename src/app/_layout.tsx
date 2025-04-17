import { Slot, Stack } from 'expo-router';
import { Suspense } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import './global.css';

import { MainProviders } from '~/src/components/providers';

export default function RootLayout() {
  return (
    <Suspense>
      <SafeAreaView className="flex-1 bg-gray-200">
        <StatusBar barStyle="dark-content" className="bg-transparent" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={80}>
          <MainProviders>
            <Slot />
          </MainProviders>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Suspense>
  );
}
