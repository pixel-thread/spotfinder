import { useRouter } from 'expo-router';
import { View, YStack, Button, Text } from 'tamagui';
import { removeToken } from '~/src/utils/storage/token';
import { removeUser } from '~/src/utils/storage/user';

export default function ProfileScreen() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <LogoutComponents />
    </YStack>
  );
}
const LogoutComponents = () => {
  const router = useRouter();
  const onClick = async () => {
    await removeUser();
    await removeToken();
    router.replace('/');
  };

  return (
    <View flex={1} className="bg-red-500" justifyContent="center" alignItems="center">
      <Text color={'black'}>Profile Screen</Text>
      <Button onPress={onClick}>Logout</Button>
    </View>
  );
};
