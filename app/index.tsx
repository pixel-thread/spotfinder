import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { removeToken } from '~/src/utils/storage/token';
import { removeUser } from '~/src/utils/storage/user';

const LoginPage = () => {
  const { onLogout } = useAuth();
  return (
    <Container className="flex h-screen items-center justify-center bg-gray-300">
      <Button variant={'outline'} onPress={onLogout}>
        logout
      </Button>
    </Container>
  );
};

export default LoginPage;
