import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Container } from '~/src/components/Container';

const LoginPage = () => {
  const router = useRouter();
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
};

export default LoginPage;
