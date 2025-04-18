import { ScrollView, View } from 'react-native';

import Skeleton from '../../ui/Skeleton';

type ParkingCardSkeletonProps = {
  value?: number;
};
export const ParkingCardSkeleton = ({ value = 1 }: ParkingCardSkeletonProps) => {
  return (
    <ScrollView className="flex-1 px-2 py-4" showsVerticalScrollIndicator={false}>
      {[...Array(value)].map((_, i) => (
        <View key={i} className="mb-4 overflow-hidden rounded-xl bg-gray-50 shadow-sm">
          <Skeleton className="h-40 w-full overflow-hidden rounded-t-lg shadow-sm" />
          <View className="gap-2 p-4">
            <Skeleton className="w-1/3" />
            <Skeleton className="w-2/3" />
          </View>
          <View className="flex flex-row justify-between gap-2 p-4">
            <Skeleton className="w-1/12" />
            <Skeleton className="w-1/12" />
            <Skeleton className="w-1/12" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
