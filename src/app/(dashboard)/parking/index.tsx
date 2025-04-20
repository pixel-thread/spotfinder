import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { View, Text, RefreshControl } from 'react-native';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { Ternary } from '~/src/components/Ternary';
import { ParkingCard } from '~/src/components/page/parking/parkingCard';
import { ParkingCardSkeleton } from '~/src/components/page/parking/parkingCardSkeleton';
import { ParkingFilter } from '~/src/components/page/parking/parkingFilter';
import { ParkingNotFoundCard } from '~/src/components/page/parking/parkingNotFound';
import { ParkingSearchCard } from '~/src/components/page/parking/parkingSearchCard';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';

type ParkingDetail = z.infer<typeof parkingSchema>;

const BookingPage = () => {
  const [parking, setParking] = useState<ParkingDetail[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const {
    isPending: isFetching,
    isIdle,
    mutate,
  } = useMutation({
    mutationKey: ['parking', page],
    mutationFn: () =>
      http.get<Required<ParkingDetail[]>>(
        PARKING_ENDPOINT.GET_PARKING.replace(':page', page.toString())
      ),
    onSuccess: (data) => {
      if (data.success) {
        const parkingData = data?.data || [];

        if (isLoadingMore) {
          setParking((prev) => [...prev, ...parkingData]);
        } else {
          setParking(parkingData);
        }

        // Check if there's more data to load
        setHasMore(data.meta?.hasNextPage || false);
        setIsLoadingMore(false);
        return data;
      }
    },
    onError: () => {
      setIsLoadingMore(false);
    },
  });

  const onPressLoadMore = useCallback(() => {
    if (!isFetching && hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, hasMore, isLoadingMore]);

  const onRefresh = () => {
    setPage(1);
    setParking([]);
    setIsLoadingMore(false);
    mutate();
  };

  // Fetch data when the component mounts or when the page changes
  useEffect(() => {
    mutate();
  }, [page]);

  // Initial data fetch
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <Container className="flex-1">
      {parking.length === 0 && isFetching ? (
        <ParkingCardSkeleton value={10} />
      ) : (
        <FlashList
          className="mt-2"
          data={parking}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={({ item }) => <ParkingCard parking={item} />}
          estimatedItemSize={5}
          refreshControl={<RefreshControl refreshing={isIdle} onRefresh={onRefresh} />}
          onEndReachedThreshold={0.5}
          onEndReached={onPressLoadMore}
          ListEmptyComponent={<ParkingNotFoundCard />}
          ListFooterComponent={isLoadingMore ? <ParkingCardSkeleton value={3} /> : null}
        />
      )}
    </Container>
  );
};

export default BookingPage;
