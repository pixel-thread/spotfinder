import { Slot } from 'expo-router';
import { Suspense } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import './global.css';

import { MainProviders } from '~/src/components/providers';
import { NavigationContainer } from '@react-navigation/native';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-200">
        <StatusBar barStyle="dark-content" className="bg-transparent" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}>
          <Suspense>
            <MainProviders>
              <Slot />
            </MainProviders>
          </Suspense>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
