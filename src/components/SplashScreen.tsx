import { View, Image, Text } from 'react-native';

export const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Image source={require('../../assets/splash.png')} className="h-[120px] w-[120px]" />
      <Text className="text-3xl font-bold text-white">
        {process.env.EXPO_PUBLIC_APP_NAME as string}
      </Text>
    </View>
  );
};
