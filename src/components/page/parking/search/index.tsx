import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { Container } from '~/src/components/Container';
import { useQuery } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import useDebounce from '~/src/hooks/useDebounce';
import { ParkingCard } from '../parkingCard';
import { ParkingNotFoundCard } from '../parkingNotFound';
import { parkingSchema } from '~/src/utils/validation/parking';
import { z } from 'zod';
import { Ternary } from '~/src/components/Ternary';
import { ParkingCardSkeleton } from '../parkingCardSkeleton';
import { useSearchParams } from 'expo-router/build/hooks';
import { ParkingFilter } from '../parkingFilter';

type ParkingDetail = z.infer<typeof parkingSchema>;
const SearchParking = () => {
  const search = useSearchParams();
  const defaultQuery = search.get('search') || '';
  const page = search.get('page') || '1';
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedValue = useDebounce<string>(searchQuery, 500);

  const { data: parkingSpots, isFetching } = useQuery({
    queryKey: ['search', debouncedValue],
    queryFn: () =>
      http.get<ParkingDetail[]>(
        PARKING_ENDPOINT.GET_SEARCH_PARKING.replace(':query', debouncedValue).replace(':page', page)
      ),
    select: (data) => data?.data,
  });

  useEffect(() => {
    setSearchQuery(defaultQuery);
  }, [defaultQuery]);

  return (
    <Container className="flex-1 bg-gray-50">
      <View className="mt-2 rounded-lg bg-white p-4">
        {/* Filters */}
        <ParkingFilter />
      </View>

      {/* Results List */}
      <Ternary
        condition={isFetching}
        trueComponent={<ParkingCardSkeleton value={10} />}
        falseComponent={
          <FlatList
            data={parkingSpots}
            renderItem={({ item }) => <ParkingCard parking={item} />}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ParkingNotFoundCard />}
          />
        }
      />
    </Container>
  );
};

export default SearchParking;
