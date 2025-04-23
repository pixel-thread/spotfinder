import { View, ScrollView } from 'react-native';

import { Container } from '~/src/components/Container';
export const ParkingDetailSkeleton = () => {
  return (
    <Container className="flex-1 items-center justify-center bg-white">
      {/* Skeleton Header Image */}
      <View className="mb-4 h-80 w-full animate-pulse rounded-b-2xl bg-gray-200" />
      <View className="w-full px-4 py-5">
        {/* Skeleton Title and Rating */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
          <View className="h-6 w-12 animate-pulse rounded bg-gray-200" />
        </View>
        {/* Skeleton Address */}
        <View className="mb-6 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
        {/* Skeleton Key Info */}
        <View className="mb-6 flex-row justify-between">
          <View className="h-14 w-20 animate-pulse rounded-lg bg-gray-200" />
          <View className="h-14 w-20 animate-pulse rounded-lg bg-gray-200" />
          <View className="h-14 w-20 animate-pulse rounded-lg bg-gray-200" />
        </View>
        {/* Skeleton Description */}
        <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        <View className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200" />
        <View className="mb-1 h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        {/* Skeleton Features */}
        <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        <View className="mb-6 flex-row flex-wrap">
          <View className="mb-2 mr-2 h-7 w-20 animate-pulse rounded-full bg-gray-200" />
          <View className="mb-2 mr-2 h-7 w-16 animate-pulse rounded-full bg-gray-200" />
          <View className="mb-2 mr-2 h-7 w-24 animate-pulse rounded-full bg-gray-200" />
        </View>
        {/* Skeleton Gallery */}
        <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="mr-2 h-24 w-32 animate-pulse rounded-lg bg-gray-200" />
          <View className="mr-2 h-24 w-32 animate-pulse rounded-lg bg-gray-200" />
          <View className="mr-2 h-24 w-32 animate-pulse rounded-lg bg-gray-200" />
        </ScrollView>
        {/* Skeleton Additional Info */}
        <View className="mt-6 space-y-3 rounded-lg bg-gray-100 p-4">
          <View className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          <View className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
        </View>
      </View>
      {/* Skeleton Bottom Action Bar */}
    </Container>
  );
};
