import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Modal, Settings } from 'react-native';
import { z } from 'zod';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';
import { BookingModal } from '../booking/bookingModal';
import { useRouter } from 'expo-router';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import { toast } from '~/src/components/ui/toast';

type ParkingDetailFooterProps = {
  id: string;
};

type ParkingDetail = z.infer<typeof parkingSchema>;

export const ParkingDetailFooter = ({ id }: ParkingDetailFooterProps) => {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { user } = useAuth();

  const { isLoading, data: parking } = useQuery({
    queryKey: ['parking', id],
    queryFn: () => http.get<ParkingDetail>(`/parking/${id}`),
    select: (data) => data?.data,
    enabled: !!id,
  });

  const isOwner = user?.id === parking?.userId;
  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: () => http.delete(PARKING_ENDPOINT.DELETE_PARKING_PARKING_ID.replace(':id', id)),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push('/account/partner');
        return data;
      }
      toast.error(data.message);
    },
  });

  if (!id) {
    return null;
  }

  const onClickAddSpot = () => {
    router.push(`/account/partner/pricing?parking=${id}`);
  };

  return (
    <View className="border-t border-gray-200 bg-white p-4 shadow-md">
      {isOwner ? (
        <View className="w-full flex-row justify-center gap-3">
          <Button
            disabled={isLoading}
            className="flex-1 flex-row items-center justify-center bg-blue-600"
            onPress={onClickAddSpot}
            size="lg">
            <Ionicons name="add-circle" size={22} color="white" />
            <Typography className="ml-2 font-semibold text-white">Spot</Typography>
          </Button>
          <Button disabled={isLoading} size="lg" variant={'secondary'} className="bg-gray-100">
            <Ionicons name="pencil" size={22} color="#2563eb" />
          </Button>
          <Button
            disabled={isLoading || isDeleting}
            variant="destructive"
            size="lg"
            className="bg-red-600"
            onPress={() => mutate()}>
            <Ionicons name="trash" size={22} color="white" />
          </Button>
        </View>
      ) : (
        <Button
          size="lg"
          className={`w-full`}
          disabled={parking?.slots?.filter((val) => val.isOccupied === false).length === 0}>
          <Typography className="font-semibold text-white">
            {parking?.slots?.filter((val) => val.isOccupied === false).length === 0
              ? 'No Available Spots'
              : 'Book a Spot'}
          </Typography>
        </Button>
      )}
      {isBookingModalOpen && (
        <BookingModal
          isOpen={isBookingModalOpen && !!id}
          onClose={() => setIsBookingModalOpen(false)}
          parkingId={id}
        />
      )}
    </View>
  );
};
