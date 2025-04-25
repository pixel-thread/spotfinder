import { View } from 'react-native';
import { Typography } from './ui/typography';
import { Container } from './Container';

export const SplashScreen = () => {
  return (
    <Container className="h-screen">
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Typography className="text-4xl font-bold uppercase leading-loose tracking-widest text-primary">
          {process.env.EXPO_PUBLIC_APP_NAME as string}
        </Typography>
      </View>
    </Container>
  );
};
