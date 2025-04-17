import { useMutation } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { View, Text, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { BookingCard } from '~/src/components/page/booking/bookingCard';
import { BookingCardSkeleton } from '~/src/components/page/booking/bookingCardSkeleton';
import { BookingFilter } from '~/src/components/page/booking/bookingFilter';
import { BookingSearchCard } from '~/src/components/page/booking/bookingSearchCard';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';

import { Ionicons } from '@expo/vector-icons';

type ParkingDetail = z.infer<typeof parkingSchema>;

const BookingPage = () => {
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
    mutate,
  } = useMutation({
    mutationKey: ['parking'],
    mutationFn: () =>
      http.get<Required<ParkingDetail[]>>(PARKING_ENDPOINT.GET_PARKING.replace(':page', page)),
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

  // Fetch data when the component mounts or when the search query changes
  useEffect(() => {
    mutate();
  }, [searchQuery, page]);

  return (
    <Container className="flex-1">
      {/* Header */}
      <View className="mt-2 rounded-lg bg-white p-4">
        {/* Search Bar */}

        <Text className="mb-4 text-xl font-bold text-gray-900">Find Parking</Text>
        <BookingSearchCard
          isLoading={isFetching}
          onPressSearch={(value) => form.setValue('search', value || '')}
        />
        {/* Filters */}
        <BookingFilter />
      </View>
      {/* Parking List */}
      <FlashList
        data={parking}
        keyExtractor={(item) => item?.id?.toString() || item.name}
        renderItem={({ item }) => <BookingCard parking={item} />}
        estimatedItemSize={10}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => mutate()} />}
        onEndReachedThreshold={0.5}
        onEndReached={onPressLoadMore}
        ListEmptyComponent={<BookingNotFoundCard />}
      />
    </Container>
  );
};

export default BookingPage;
const BookingNotFoundCard = () => {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <Ionicons name="car-outline" size={60} color="#d1d5db" />
      <Text className="mt-4 text-center text-gray-500">No parking spots found.</Text>
    </View>
  );
};
