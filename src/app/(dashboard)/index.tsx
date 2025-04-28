import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { z } from 'zod';

import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Card } from '~/src/components/ui/card';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import { USER_ENDPOINT } from '~/src/libs/endpoints/user';
import { BookingI } from '~/src/types/booking';
import http from '~/src/utils/https';
import { logger } from '~/src/utils/logger';
import { parkingSchema } from '~/src/utils/validation/parking';

const quickActions = [
  { label: 'Find Spot', icon: 'car', bg: 'bg-blue-100', color: 'text-black dark:text-black' },
  {
    label: 'History',
    icon: 'time-outline',
    bg: 'bg-orange-100',
    color: 'text-black dark:text-black',
  },
  {
    label: 'Payment',
    icon: 'card-outline',
    bg: 'bg-green-100',
    color: 'text-black dark:text-black',
  },
];

type ParkingDetail = z.infer<typeof parkingSchema>;

const calculateTimeLeft = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const HomePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const page = '1';

  const { data: parkingRandom } = useQuery({
    queryKey: ['parking', page],
    queryFn: () =>
      http.get<Required<ParkingDetail>[]>(
        PARKING_ENDPOINT.GET_RANDOM_PARKING.replace(':page', page).replace(':limit', '5')
      ),
    select: (data) => data.data,
  });

  const { data: recentBooking } = useQuery({
    queryKey: ['parking recent booking', page, user],
    queryFn: () => http.get<BookingI[]>(USER_ENDPOINT.GET_USER_RECENT_BOOKINGS),
    select: (data) => data.data,
    enabled: !!user,
  });

  const { data: bookingHistory } = useQuery({
    queryKey: ['parking-history', page, user],
    queryFn: () => http.get<BookingI[]>(USER_ENDPOINT.GET_USER_BOOKING_HISTORY),
    select: (data) => data.data,
    enabled: !!user,
  });

  return (
    <Container className="bg-white dark:bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <Card className="my-2 rounded-lg bg-white p-4">
          <View className="my-6 flex-row items-center justify-between rounded-lg">
            <View>
              <Typography variant="heading">Hello 👋</Typography>
              <Typography variant="heading" className="text-2xl font-bold">
                Welcome Back
              </Typography>
            </View>
            <TouchableOpacity className="rounded-full bg-gray-100 p-2">
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View className="mb-6 flex-row justify-between gap-2">
            {quickActions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                className={`flex-1 items-center justify-center rounded-xl p-3 ${action.bg}`}>
                <Ionicons name={action.icon as any} size={24} color="#333" />
                <Typography className={`mt-1 text-sm font-medium ${action.color}`}>
                  {action.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        {/* Active Parking Section */}
        {recentBooking && recentBooking.length > 0 && (
          <View className="mb-6">
            <Typography className="mb-3 text-lg font-medium">Active Booking</Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentBooking &&
                recentBooking.map((parking, idx) => (
                  <TouchableOpacity
                    key={`active-${idx}`}
                    className="mr-3 w-64 rounded-xl bg-blue-500 p-4">
                    <View className="flex-row items-center justify-between">
                      <View className="rounded-full bg-white/20 p-2">
                        <Ionicons name="time" size={20} color="white" />
                      </View>
                      <Typography className="font-bold text-white">
                        {calculateTimeLeft(parking.startTime, parking.endTime)}
                      </Typography>
                    </View>
                    <Typography className="mt-3 text-lg font-bold text-white">
                      {parking.parkingLot.name}
                    </Typography>
                    <View className="mt-2 flex-row items-center">
                      <Ionicons name="car-outline" size={16} color="white" />
                      <Typography className="ml-1 text-white">
                        Status: {parking.bookingStatus}
                      </Typography>
                    </View>
                    <Button className="mt-3 w-full bg-white" size="sm">
                      <Typography className="text-black dark:text-black">Extend Time</Typography>
                    </Button>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        )}

        {/* Promo / CTA Section */}
        <View className="mb-6 rounded-2xl bg-blue-50 p-4 shadow-sm dark:bg-gray-800">
          <View className="mb-3 flex-row items-center justify-between">
            <Typography className="text-lg font-semibold text-gray-800">
              Looking for parking?
            </Typography>
            <Ionicons name="search" size={22} color="#4c669f" />
          </View>
          <Typography className="mb-3 text-sm text-gray-600">
            Find the perfect spot near your destination
          </Typography>
          <Button
            onPress={() => router.replace('/parking/search?autoFocus=true')}
            className="w-full bg-blue-600"
            size="lg">
            Find Parking Now
          </Button>
        </View>

        {/* New Parking Options */}
        <View className="mb-6">
          <Typography className="mb-3 text-lg font-medium text-gray-800">
            New Parking Options
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex flex-row">
            {parkingRandom?.map((parking, idx) => (
              <Link href={`/parking/${parking.id}`} key={parking?.id + idx} asChild>
                <TouchableOpacity className="mb-4 mr-4 w-64 overflow-hidden rounded-xl bg-white shadow-sm">
                  <Image
                    source={{ uri: parking.image }}
                    className="h-40 w-full"
                    resizeMode="cover"
                  />
                  <View className="p-4">
                    <View className="mb-1 flex-row items-center justify-between">
                      <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
                        {parking.name}
                      </Text>
                      <View className="flex-row items-center">
                        <Ionicons
                          name={
                            user && parking && parking?.rating?.includes(user?.id)
                              ? 'star'
                              : 'star-outline'
                          }
                          size={16}
                          color="#f59e0b"
                        />
                        <Text className="ml-1 text-gray-700">{parking?.rating?.length}</Text>
                      </View>
                    </View>

                    <Text className="mb-2 text-gray-600" numberOfLines={1}>
                      {parking.address}
                    </Text>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Ionicons name="pricetag-outline" size={16} color="#3b82f6" />
                        <Text className="ml-1 font-semibold text-blue-600">{parking.price}</Text>
                      </View>

                      <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={16} color="#6b7280" />
                        <Text className="ml-1 text-gray-600">{parking.distance}</Text>
                      </View>
                    </View>

                    <View className="mt-2 flex-row items-center">
                      <Ionicons name="car-outline" size={16} color="#10b981" />
                      {/* <Text className="ml-1 text-green-600">{parking.available} spots</Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>

        {/* Recent Spots */}
        <Typography className="mb-4 text-lg font-medium text-gray-800">Recent Spots</Typography>
        {/* <View className="flex flex-col gap-2"> */}
        {/*   {bookingHistory && */}
        {/*     bookingHistory.map((item, index) => ( */}
        {/*       <Card key={`recent-${index}`}> */}
        {/*         <TouchableOpacity className="mb-3 flex-row items-center justify-between p-4"> */}
        {/*           <View className="flex-row items-center"> */}
        {/*             <View className="mr-3 rounded-full bg-blue-100 p-2"> */}
        {/*               <Ionicons name="car" size={22} color="#4c669f" /> */}
        {/*             </View> */}
        {/*             <View> */}
        {/*               <Typography className="font-semibold text-gray-900"> */}
        {/*                 {item?.parkingLot.name} */}
        {/*               </Typography> */}
        {/*               <Typography className="text-sm text-gray-600"> */}
        {/*                 {item.startTime.split(' ')[0]}/{item.endTime.split(' ')[0]} */}
        {/*               </Typography> */}
        {/*             </View> */}
        {/*           </View> */}
        {/*           <View className="items-end"> */}
        {/*             <Typography className="font-bold text-blue-600"> */}
        {/*               {item?.parkingLot?.price}/hr */}
        {/*             </Typography> */}
        {/*             <Typography className="text-xs text-gray-500">{item.bookingStatus}</Typography> */}
        {/*           </View> */}
        {/*         </TouchableOpacity> */}
        {/*       </Card> */}
        {/*     ))} */}
        {/* </View> */}
        {/* Add padding at the bottom for better scrolling experience */}
        <View className="h-6" />
      </ScrollView>
    </Container>
  );
};

export default HomePage;
