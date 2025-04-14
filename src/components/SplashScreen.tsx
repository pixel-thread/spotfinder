import { View, Image } from 'react-native';
import { Spinner, Text } from 'tamagui';

export const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Image source={require('../../assets/splash.png')} className="h-[120px] w-[120px]" />
      <Text className="text-3xl font-bold text-white">
        {process.env.EXPO_PUBLIC_APP_NAME as string}
      </Text>
      <Spinner size="large" color="$blue10" />
    </View>
  );
};
