import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { useAuth } from '~/src/hooks/auth/useAuth';

const ProfilePage = () => {
  const { onLogout } = useAuth();
  return (
    <Container className="flex h-screen items-center justify-center bg-gray-300">
      <Button variant={'outline'} onPress={onLogout}>
        Profile
      </Button>
    </Container>
  );
};

export default ProfilePage;
