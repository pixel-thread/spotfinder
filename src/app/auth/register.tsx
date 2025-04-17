import { Link } from 'expo-router';
import { View } from 'react-native';

import { Container } from '~/src/components/Container';
import { RegisterForm } from '~/src/components/page/auth/register-form';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { saveSkipAuth } from '~/src/utils/storage/auth/skipAuth';

export default function RegisterPage() {
  const handleSkipAuth = async () => {
    return await saveSkipAuth(true);
  };

  return (
    <Container className="flex-1 justify-center px-4">
      <View className="flex w-full max-w-md flex-col gap-6 self-center">
        <View className="space-y-2">
          <Typography variant="heading" className="text-center">
            Create Account
          </Typography>
          <Typography variant="caption" className="text-center">
            Join us to start managing your parking experience
          </Typography>
        </View>

        <RegisterForm />

        <View className="flex-row items-center justify-center space-x-1">
          <Typography variant="body">or</Typography>
        </View>

        <View className="flex-row items-center justify-center space-x-1">
          <Typography variant="label">Already have an account?</Typography>
          <Link href="/auth" asChild>
            <Button variant="link" size="sm">
              Sign in
            </Button>
          </Link>
        </View>
        <View className="flex-row items-center justify-center space-x-1">
          <Link replace href="/" onPress={handleSkipAuth} asChild>
            <Button variant="ghost" size="sm">
              Skip
            </Button>
          </Link>
        </View>
      </View>
    </Container>
  );
}
