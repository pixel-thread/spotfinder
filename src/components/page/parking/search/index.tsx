import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { z } from 'zod';

import { ParkingCard } from '../parkingCard';
import { ParkingCardSkeleton } from '../parkingCardSkeleton';
import { ParkingFilter } from '../parkingFilter';
import { ParkingNotFoundCard } from '../parkingNotFound';

import { Container } from '~/src/components/Container';
import { Ternary } from '~/src/components/Ternary';
import useDebounce from '~/src/hooks/useDebounce';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';

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
