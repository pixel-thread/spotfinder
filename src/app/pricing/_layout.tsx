import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Button } from '~/src/components/ui/button';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: '',
        headerBackButtonDisplayMode: 'generic',
        headerLeft: (props) => (
          <Button {...props} variant={'ghost'} size={'icon'}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Button>
        ),
      }}
    />
  );
}
