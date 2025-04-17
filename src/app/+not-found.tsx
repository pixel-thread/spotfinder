import { Link, Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';

export default function NotFoundScreen() {
  const router = useRouter();
  const onPress = () => {
    router.back();
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found', headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-white px-6">
        <View className="w-full max-w-sm items-center">
          {/* Error Icon/Image */}
          <View className="mb-6 rounded-full bg-blue-50 p-6">
            <Ionicons name="alert-circle-outline" size={80} color="#3b82f6" />
          </View>

          {/* Error Message */}
          <Typography variant="heading" className="mb-2 text-center text-2xl font-bold">
            Oops! Page Not Found
          </Typography>

          <Typography className="mb-8 text-center text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          {/* Action Buttons */}
          <Link href="/" asChild>
            <Button className="mb-3 w-full bg-blue-600">Go to Home</Button>
          </Link>
        </View>

        {/* Footer */}
        <View className="absolute bottom-8 flex-row items-center">
          <Ionicons name="car-outline" size={20} color="#6b7280" />
          <Typography className="ml-2 text-gray-500">ParkEasy</Typography>
        </View>
      </View>
    </>
  );
}
