import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { Ternary } from '~/src/components/Ternary';
import Skeleton from '~/src/components/ui/Skeleton';
import { Button } from '~/src/components/ui/button';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';

type ParkingDetail = z.infer<typeof parkingSchema>;

const filters = ['All', 'Nearest', 'Cheapest', 'Highest Rated', 'Most Available'];
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

type BookingCardProps = {
  parking: ParkingDetail;
};

const BookingCard = ({ parking }: BookingCardProps) => {
  const { user } = useAuth();
  return (
    <Link href={`/parking/${parking.id}`} asChild>
      <TouchableOpacity
        key={parking.id}
        className="mb-4 overflow-hidden rounded-lg bg-white shadow-sm">
        <Image source={{ uri: parking.image }} className="h-40 w-full" resizeMode="cover" />
        <View className="p-4">
          <View className="mb-1 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-900">{parking.name}</Text>
            <View className="flex-row items-center">
              <Ionicons
                name={
                  user && parking && parking?.rating?.includes(user?.id) ? 'star' : 'star-outline'
                }
                size={16}
                color="#f59e0b"
              />
              <Text className="ml-1 text-gray-700">{parking?.rating?.length}</Text>
            </View>
          </View>

          <Text className="mb-2 text-gray-600">{parking.address}</Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="pricetag-outline" size={16} color="#3b82f6" />
              <Text className="ml-1 font-semibold text-blue-600">{parking.price}</Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text className="ml-1 text-gray-600">{parking.distance}</Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="car-outline" size={16} color="#10b981" />
              <Text className="ml-1 text-green-600">{parking.available} spots</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
const BookingCardSkeleton = () => {
  return (
    <ScrollView className="flex-1 px-2 py-4" showsVerticalScrollIndicator={false}>
      {[...Array(10)].map((_, i) => (
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
const BookingFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={index}
          className={`mr-2 rounded-full px-4 py-2 ${
            selectedFilter === filter ? 'bg-blue-500' : 'bg-gray-100'
          }`}
          onPress={() => setSelectedFilter(filter)}>
          <Text
            className={`${selectedFilter === filter ? 'text-white' : 'text-gray-700'} font-medium`}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

type FieldValues = {
  search: string;
};

type BookingSearchCardProps = {
  isLoading: boolean;
  onPressSearch: (value?: string) => void;
};

const BookingSearchCard = ({ isLoading, onPressSearch }: BookingSearchCardProps) => {
  const form = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  });

  const watchOnSearchChange = useWatch({
    control: form.control,
    name: 'search',
  });

  // TODO: add debounce
  useEffect(() => {
    if (watchOnSearchChange) {
      onPressSearch(watchOnSearchChange);
    }
  }, [watchOnSearchChange]);

  return (
    <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 px-3 py-2">
      <Ionicons name="search-outline" size={20} color="#6b7280" className="mr-2" />
      <Controller
        name="search"
        control={form.control}
        disabled={isLoading}
        render={({ field: { onChange, onBlur, value, ...field } }) => (
          <TextInput
            {...field}
            onChangeText={onChange}
            value={value}
            className="flex-1 bg-transparent text-gray-800" // Ensure full width
            keyboardType="default"
            placeholder="Search"
            placeholderTextColor="#9ca3af" // Consistent placeholder color
          />
        )}
      />
    </View>
  );
};
