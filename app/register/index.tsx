import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Container } from '~/src/components/Container';

const RegisterPage = () => {
  const router = useRouter();
  return (
    <Container>
      <View>Registration Page</View>
    </Container>
  );
};

export default RegisterPage;
