import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Modal, View } from 'react-native';
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
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
        queryClient.invalidateQueries({ queryKey: ['parking'] });
        return data;
      }
      toast.error(data.message);
      return data;
    },
  });

  if (!id) {
    return null;
  }

  const onClickAddSpot = () => {
    router.push(`/account/partner/pricing?parking=${id}`);
  };

  return (
    <View className="rounded-t-2xl border-t border-gray-200 bg-white p-4 shadow-lg">
      {isOwner ? (
        <View className="w-full flex-row justify-center gap-3">
          <Button
            disabled={isLoading}
            className="flex-1 flex-row items-center justify-center "
            onPress={onClickAddSpot}
            size="lg">
            <Ionicons name="add-circle" size={22} color="white" />
            <Typography className="ml-2 font-semibold text-white">Spot</Typography>
          </Button>
          <Button disabled={isLoading} size="lg" variant={'secondary'}>
            <Ionicons name="pencil" size={22} color="#2563eb" />
          </Button>
          <Button
            disabled={isLoading || isDeleting}
            variant="destructive"
            size="lg"
            onPress={() => setIsDeleteModalOpen(true)}>
            <Ionicons name="trash" size={22} color="white" />
          </Button>
        </View>
      ) : (
        <Button
          size="lg"
          className={`w-full${parking?.slots?.filter((val) => val.isOccupied === false).length === 0 ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-500 to-blue-700'}`}
          onPress={() => setIsBookingModalOpen(true)}
          disabled={parking?.slots?.filter((val) => val.isOccupied === false).length === 0}>
          <Typography className="font-semibold text-white">
            {parking?.slots?.filter((val) => val.isOccupied === false).length === 0
              ? 'No Available Spots'
              : 'Book a Spot'}
          </Typography>
        </Button>
      )}
      {isDeleteModalOpen && (
        <Modal
          visible={isDeleteModalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsDeleteModalOpen(false)}>
          <View className="flex-1 items-center justify-center bg-black/60">
            <View className="w-80 rounded-2xl bg-white p-8 shadow-2xl">
              <Typography
                variant="heading"
                className="mb-3 text-center text-xl font-bold text-red-600">
                Delete Parking?
              </Typography>
              <Typography className="mb-8 text-center text-gray-700">
                Are you sure you want to delete this parking space? This action cannot be undone.
              </Typography>
              <View className="flex-row justify-between gap-4">
                <Button
                  variant="secondary"
                  className="flex-1 rounded-lg bg-gray-100"
                  onPress={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}>
                  <Typography className="font-semibold text-gray-700">Cancel</Typography>
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 rounded-lg bg-red-600"
                  onPress={() => {
                    setIsDeleteModalOpen(false);
                    mutate();
                  }}
                  disabled={isDeleting}>
                  <Typography className="font-semibold text-white">
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Typography>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
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
