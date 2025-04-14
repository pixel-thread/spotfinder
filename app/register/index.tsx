import { useRouter } from 'expo-router';
import { YStack, Card, XStack, Text, Button } from 'tamagui';

import { Container } from '~/src/components/Container';
import { RegisterForm } from '~/src/components/page/home/register/RegisterForm';

const RegisterPage = () => {
  const router = useRouter();
  return (
    <Container>
      <YStack
        flex={1}
        justifyContent="center"
        className="bg-red-500"
        alignItems="center"
        padding="$4">
        <Card elevate size="$4" bordered width="100%" maxWidth={400} padding="$4">
          <RegisterForm />

          <XStack justifyContent="center" alignItems="center" marginTop="$2">
            <Text className="text-gray-600">Already have an account? </Text>
            <Button onPress={() => router.push('/')} size="$2" chromeless>
              Sign In
            </Button>
          </XStack>
        </Card>
      </YStack>
    </Container>
  );
};

export default RegisterPage;
