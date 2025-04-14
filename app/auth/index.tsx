import { Link } from 'expo-router';
import { View, Text } from 'react-native';

import { Container } from '~/src/components/Container';
import { LoginForm } from '~/src/components/page/auth/login-form';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';

export default function LoginPage() {
  return (
    <Container className="flex-1 justify-center px-4">
      <View className="flex w-full max-w-md flex-col gap-6 self-center">
        {/* Header */}
        <View className="space-y-2">
          <Typography variant="heading" className="text-center">
            Welcome Back
          </Typography>
          <Typography variant="caption" className="text-center">
            Sign in to continue to your account
          </Typography>
        </View>

        {/* Login Form */}
        <LoginForm />

        <View className="flex-row items-center justify-center space-x-1">
          <Typography variant="body">or</Typography>
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
          <Link href="/" asChild>
            <Button variant="ghost" size="sm">
              Skip
            </Button>
          </Link>
        </View>
      </View>
    </Container>
  );
}
