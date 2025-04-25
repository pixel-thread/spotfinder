import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { Container } from '~/src/components/Container';
import { Typography } from '~/src/components/ui/typography';
import PlanCard from './planCard';

import { useQuery } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import { parkingSchema } from '~/src/utils/validation/parking';
import { z } from 'zod';
import { useAuth } from '~/src/hooks/auth/useAuth';

type ParkingDetail = z.infer<typeof parkingSchema>;

export const Pricing = () => {
  const { user } = useAuth();
  const [selectedParking, setSelectedParking] = useState<string>('');
  const { isFetching, data: parkings } = useQuery({
    queryKey: ['parking', user?.id],
    queryFn: () =>
      http.get<Required<ParkingDetail>[]>(
        PARKING_ENDPOINT.GET_PARKING_BY_USER_ID.replace(':userId', user?.id || '')
      ),
    enabled: !!user,
    select: (data) => data?.data,
  });

  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {/* Header with improved messaging */}
          <View className="mb-6">
            <Typography variant="heading" className="text-center text-2xl">
              Become a Partner
            </Typography>
            <Typography variant="body" className="mt-2 text-center text-gray-600">
              Purchase at least one slot to join our network and start earning
            </Typography>
          </View>

          {/* Hero banner */}
          <View className="mb-6 overflow-hidden rounded-xl bg-blue-600">
            <View className="p-5">
              <Typography variant="heading" className="text-xl text-white">
                Turn Your Space Into Income
              </Typography>
              <Typography variant="body" className="mt-1 text-blue-100">
                Join thousands of partners earning passive income
              </Typography>
              <View className="mt-3 flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Typography className="ml-2 text-white">Start with just 1 slot</Typography>
              </View>
            </View>
          </View>

          {/* Parking Selection with Checkboxes */}
          <View className="mb-4">
            <Typography
              variant="body"
              className="mb-2 font-medium text-gray-700 dark:text-gray-300">
              Select Your Parking Space
            </Typography>
            <View className="rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
              {parkings && parkings.length > 0 ? (
                parkings.map((parking) => (
                  <TouchableOpacity
                    key={parking.id}
                    className="flex-row items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700"
                    onPress={() => {
                      if (selectedParking === parking.id) {
                        setSelectedParking('');
                      } else {
                        setSelectedParking(parking.id);
                      }
                    }}>
                    <View className="flex-1">
                      <Typography className="font-medium text-gray-800 dark:text-gray-200">
                        {parking.name || 'Unnamed Parking'}
                      </Typography>
                      <Typography className="text-sm text-gray-500 dark:text-gray-400">
                        {parking.address || 'No address provided'}
                      </Typography>
                    </View>
                    <View
                      className={`h-6 w-6 items-center justify-center rounded-full border ${
                        selectedParking === parking.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700'
                      }`}>
                      {selectedParking === parking.id && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View className="p-3">
                  <Typography className="text-center text-gray-500 dark:text-gray-400">
                    {isFetching ? 'Loading parking locations...' : 'No parking locations available'}
                  </Typography>
                </View>
              )}
            </View>
          </View>

          {/* Plan Card with emphasis */}
          <View className="mb-6">
            <PlanCard parkingId={selectedParking} />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
export default Pricing;
