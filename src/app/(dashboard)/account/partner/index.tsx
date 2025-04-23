import { useMutation } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { View, Text, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { ParkingCard } from '~/src/components/page/parking/parkingCard';
import { ParkingFilter } from '~/src/components/page/parking/parkingFilter';
import { ParkingSearchCard } from '~/src/components/page/parking/parkingSearchCard';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';

import { Ionicons } from '@expo/vector-icons';
import { Ternary } from '~/src/components/Ternary';
import { ParkingCardSkeleton } from '~/src/components/page/parking/parkingCardSkeleton';
import { useAuth } from '~/src/hooks/auth/useAuth';

type ParkingDetail = z.infer<typeof parkingSchema>;

const PartnerParkingPage = () => {
  const { user } = useAuth();
  const [parking, setParking] = useState<ParkingDetail[]>([]);
  const [page, setPage] = useState<string>('1');

  const form = useForm({
    defaultValues: {
      search: '',
    },
  });

  const searchQuery = useWatch({ control: form.control, name: 'search' });

  const {
    data,
    isPending: isFetching,
    isIdle,
    mutate,
  } = useMutation({
    mutationKey: ['parking', user?.id],
    mutationFn: () =>
      http.get<Required<ParkingDetail[]>>(
        PARKING_ENDPOINT.GET_PARKING_BY_USER_ID.replace(':userId', user?.id || '').replace(
          ':page',
          page
        )
      ),
    onSuccess: (data) => {
      if (data.success) {
        const parking = data?.data || [];
        setParking((prev) => [...prev, ...parking]);
        return data;
      }
    },
  });

  const onPressLoadMore = useCallback(() => {
    const meta = data?.meta;
    if (meta?.hasNextPage) {
      const nextPage = meta.page + 1;
      setPage(nextPage.toString());
    }
  }, [data]);

  const onRefresh = () => {
    if (parking.length > 0) {
      setParking([]);
    }
    mutate();
  };

  // Fetch data when the component mounts or when the search query changes
  useEffect(() => {
    mutate();
  }, [searchQuery, page]);

  return (
    <Container className="flex-1">
      {/* Header */}
      <View className="mt-2 rounded-lg bg-white p-4">
        {/* Search Bar */}

        <Text className="mb-4 text-xl font-bold text-gray-900">Find Your Parking</Text>
        <ParkingSearchCard
          isLoading={isFetching}
          onPressSearch={(value) => form.setValue('search', value || '')}
        />
      </View>
      <Ternary
        condition={isFetching}
        trueComponent={<ParkingCardSkeleton value={10} />}
        falseComponent={
          <FlashList
            className="mt-2"
            data={parking}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({ item }) => <ParkingCard parking={item} />}
            estimatedItemSize={10}
            refreshControl={<RefreshControl refreshing={isIdle} onRefresh={onRefresh} />}
            onEndReachedThreshold={0.5}
            onEndReached={onPressLoadMore}
            ListEmptyComponent={<ParkingNotFoundCard />}
          />
        }
      />
    </Container>
  );
};

export default PartnerParkingPage;

const ParkingNotFoundCard = () => {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <Ionicons name="car-outline" size={60} color="#d1d5db" />
      <Text className="mt-4 text-center text-gray-500">No parking spots found.</Text>
    </View>
  );
};
