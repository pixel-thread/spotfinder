import { ScrollView, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import Skeleton from '../../ui/Skeleton';

type ParkingCardSkeletonProps = {
  value?: number;
};
export const ParkingCardSkeleton = ({ value = 1 }: ParkingCardSkeletonProps) => {
  return (
    <FlashList
      data={Array(value)}
      className="flex-1 px-2 py-4"
      estimatedItemSize={value}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <View className="mb-4 overflow-hidden rounded-xl bg-gray-50 shadow-sm dark:bg-gray-800">
          <Skeleton className="h-40 w-full overflow-hidden rounded-t-lg shadow-sm" />
          <View className="gap-2 p-4">
            <Skeleton className="w-1/3" />
            <Skeleton className="w-2/3" />
          </View>
        </View>
      )}
    />
  );
};
