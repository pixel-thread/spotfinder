import { View, Modal } from 'react-native';

type BookingModalProps = {
  // isOpen: boolean;
  // onClose: () => void;
};

export const BookingModalSkeleton = ({ isOpen }: BookingModalProps) => {
  return (
    <View className="flex-1 justify-end bg-black/50">
      <View className="rounded-t-3xl bg-white p-5">
        {/* Header Skeleton */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="h-7 w-1/3 animate-pulse rounded bg-gray-200" />
          <View className="h-6 w-6 rounded-full" />
        </View>

        {/* Parking Info Skeleton */}
        <View className="mb-4 rounded-lg bg-blue-50 p-3">
          <View className="h-5 w-1/2 animate-pulse rounded bg-blue-100" />
          <View className="mt-2 flex-row items-center">
            <View className="h-4 w-4 rounded-full" />
            <View className="ml-1 h-4 w-1/4 animate-pulse rounded bg-blue-100" />
          </View>
        </View>

        {/* Time Selection Skeleton */}
        <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        <View className="mb-4 flex-row justify-between">
          <View className="mr-2 flex-1 rounded-lg border border-gray-200 p-3">
            <View className="mb-1 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            <View className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          </View>
          <View className="ml-2 flex-1 rounded-lg border border-gray-200 p-3">
            <View className="mb-1 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            <View className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          </View>
        </View>

        {/* Spot Selection Skeleton */}
        <View className="mb-2 h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        <View className="mb-4 flex-row flex-wrap">
          {[1, 2, 3, 4, 5].map((spot) => (
            <View key={spot} className="m-1 h-9 w-12 animate-pulse rounded-lg bg-gray-200" />
          ))}
        </View>

        {/* Summary Skeleton */}
        <View className="mb-4 rounded-lg bg-gray-50 p-3">
          <View className="mb-2 flex-row items-center justify-between">
            <View className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
            <View className="h-4 w-1/5 animate-pulse rounded bg-gray-200" />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
            <View className="h-6 w-1/4 animate-pulse rounded bg-gray-200" />
          </View>
        </View>

        {/* Button Skeleton */}
        <View className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
      </View>
    </View>
  );
};
