import { Ionicons } from '@expo/vector-icons';
import { View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { Container } from '~/src/components/Container';
import { LoginForm } from '~/src/components/page/auth/login-form';
import { Typography } from '~/src/components/ui/typography';

export default function LoginPage() {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
        <Container className="flex h-full">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
            {/* Hero section with image */}
            <View className="h-[50%] overflow-hidden">
              <Image
                source={require('../../../assets/login/login-image.jpg')}
                className="h-full w-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 h-28 w-full bg-gradient-to-t from-white to-transparent" />

              {/* Logo overlay */}
              <View className="absolute bottom-8 left-0 right-0 items-center">
                <View className="rounded-full bg-white/90 p-3 shadow-lg">
                  <Ionicons name="car" size={40} color="#3b82f6" />
                </View>
              </View>
            </View>

            <View className="flex flex-col gap-6 px-6 pt-8">
              <View className="flex flex-col gap-2">
                <Typography
                  variant="heading"
                  className="text-center text-3xl font-bold text-gray-900">
                  Welcome to ParkEase
                </Typography>
                <Typography className="text-center text-gray-600" variant="caption">
                  Find and book parking spots with ease. Enter your phone number to continue.
                </Typography>
              </View>

              <View className="mt-4">
                <LoginForm />
              </View>
            </View>
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}
