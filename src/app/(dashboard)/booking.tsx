import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { View, Text, ScrollView } from 'react-native';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { Ternary } from '~/src/components/Ternary';
import { BookingCard } from '~/src/components/page/booking/bookingCard';
import { BookingCardSkeleton } from '~/src/components/page/booking/bookingCardSkeleton';
import { BookingFilter } from '~/src/components/page/booking/bookingFilter';
import { BookingSearchCard } from '~/src/components/page/booking/bookingSearchCard';
import { Button } from '~/src/components/ui/button';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';

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
    mutationKey: ['parking', page, searchQuery],
    mutationFn: ({ page, query }: { page: string; query?: string }) =>
      http.get<ParkingDetail[]>(
        PARKING_ENDPOINT.GET_SEARCH_PARKING.replace(':query', query || '').replace(':page', page)
      ),
    onSuccess: (data) => {
      if (data.success) {
        const parking = data?.data || [];
        setParking((prev) => [...prev, ...parking]);
        return data;
      }
    },
  });

  const filteredParking = parking;

  const onPressLoadMore = () => {
    const meta = data?.meta;
    if (meta?.hasNextPage) {
      const nextPage = meta.page + 1;
      setPage(nextPage.toString());
    }
  };

  // Fetch data when the component mounts or when the search query changes
  useEffect(() => {
    mutate({ page, query: searchQuery });
  }, [searchQuery, page]);

  return (
    <Container className="flex-1">
      {/* Header */}
      <View className="mt-2 rounded-lg bg-white p-4">
        {/* Search Bar */}

        <Text className="mb-4 text-xl font-bold text-gray-900">Find Parking</Text>
        <BookingSearchCard
          isLoading={isFetching}
          onPressSearch={(value) => mutate({ page: '1', query: value })}
        />
        {/* Filters */}
        <BookingFilter />
      </View>
      {/* Parking List */}
      <ScrollView
        className="flex-1 px-4 py-5"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        {filteredParking && filteredParking.length > 0 ? (
          filteredParking.map((parking, i) => <BookingCard parking={parking} key={i} />)
        ) : (
          <Ternary
            condition={isFetching}
            trueComponent={<BookingCardSkeleton />}
            falseComponent={
              <View className="flex-1 items-center justify-center py-10">
                <Ionicons name="car-outline" size={60} color="#d1d5db" />
                <Text className="mt-4 text-center text-gray-500">
                  No parking spots found matching your search.
                </Text>
              </View>
            }
          />
        )}
        <Ternary
          condition={isFetching}
          trueComponent={<BookingCardSkeleton />}
          falseComponent={
            <View>
              <Button
                variant="secondary"
                onPress={onPressLoadMore}
                disabled={!data?.meta?.hasNextPage}>
                Load More
              </Button>
            </View>
          }
        />
      </ScrollView>
    </Container>
  );
};

export default BookingPage;
