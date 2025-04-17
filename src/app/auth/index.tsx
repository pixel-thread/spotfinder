import { Link } from 'expo-router';
import { View, Text, ImageBackground } from 'react-native';

import { Container } from '~/src/components/Container';
import { LoginForm } from '~/src/components/page/auth/login-form';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { saveSkipAuth } from '~/src/utils/storage/auth/skipAuth';

export default function LoginPage() {
  const onPressSkip = async () => {
    return await saveSkipAuth(true);
  };

  return (
    <Container className="flex-1 justify-center bg-white px-4">
      {/* Background Image */}
      <ImageBackground
        source={{ uri: 'https://example.com/background-image.jpg' }} // Replace with a real image URL
        className="absolute inset-0"
        resizeMode="cover"
        style={{ opacity: 0.3 }}
        imageClassName="bg-gray-200"
      />

      <View className="flex w-full max-w-md flex-col gap-6 self-center rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <View className="space-y-2">
          <Typography variant="heading" className="text-center text-3xl font-bold text-blue-800">
            Welcome Back
          </Typography>
          <Typography variant="caption" className="text-center text-gray-600">
            Sign in to continue to your account
          </Typography>
        </View>

        {/* Login Form */}
        <LoginForm />

        <View className="flex-row items-center justify-center space-x-1">
          <Typography variant="body" className="text-gray-600">
            or
          </Typography>
        </View>

        {/* Footer Link */}
        <View className="flex-row items-center justify-center space-x-1">
          <Text className="text-sm text-gray-600">Don't have an account?</Text>
          <Link href="/auth/register" asChild>
            <Button variant="link" size="sm">
              Sign Up
            </Button>
          </Link>
        </View>
        {/* Footer Link */}
        <View className="flex-row items-center justify-center space-x-1">
          <Link href="/" replace onPress={onPressSkip} asChild>
            <Button variant="secondary" size="sm">
              Continue without login
            </Button>
          </Link>
        </View>
      </View>
    </Container>
  );
}
