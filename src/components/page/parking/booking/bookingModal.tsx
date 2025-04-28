import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { z } from 'zod';

import { BookingModalSkeleton } from './bookingModalSkeleton';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';
import { toast } from '~/src/components/ui/toast';
import { useRouter } from 'expo-router';

type ParkingDetail = z.infer<typeof parkingSchema>;

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  parkingId: string;
};

const calculateDuration = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};
// Inside the BookingModal component, add this skeleton UI for loading state
export const BookingModal = ({ isOpen, onClose, parkingId }: BookingModalProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000)); // Default 1 hour
  const [selectedSpot, setSelectedSpot] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activePicker, setActivePicker] = useState<'start' | 'end'>('start');

  const {
    isLoading,
    data: parking,
    isFetching,
  } = useQuery({
    queryKey: ['parking', parkingId],
    queryFn: () =>
      http.get<ParkingDetail>(PARKING_ENDPOINT.GET_PARKING_BY_ID.replace(':id', parkingId)),
    enabled: isOpen && !!parkingId,
    select: (data) => data?.data,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      http.post(PARKING_ENDPOINT.POST_ADD_BOOKING.replace(':id', parkingId), {
        startTime: startDate,
        endTime: endDate,
        userId: user?.id,
      }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        onClose();
        return data.data;
      }
      toast.error(data.message);
    },
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleConfirmDate = (date: Date) => {
    if (activePicker === 'start') {
      setStartDate(date);
      // Ensure end time is after start time
      if (date.getTime() >= endDate.getTime()) {
        setEndDate(new Date(date.getTime() + 60 * 60 * 1000));
      }
    } else {
      setEndDate(date);
    }
    setDatePickerVisible(false);
  };

  const calculatePrice = () => {
    const hourlyRate = parking?.price || 0;
    // Calculate hours between start and end time
    const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    // Apply minimum 1 hour rule
    const billableHours = Math.max(1, hours);
    return `₹${(hourlyRate * billableHours).toFixed(2)}`;
  };
  const onPressConfirmBooking = () => {
    if (user) {
      mutate();
    }
    onClose();
    router.push('/auth');
  };
  // If loading, show skeleton UI
  if (isLoading || isFetching) {
    return <BookingModalSkeleton />;
  }

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/50">
        {isLoading || isFetching ? (
          <View className="rounded-t-3xl bg-white p-5">
            {/* Skeleton content */}
            <BookingModalSkeleton />
          </View>
        ) : (
          <View className="rounded-t-3xl bg-white p-5">
            {/* Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Typography variant="heading" className="text-xl font-bold">
                Book Parking
              </Typography>
              <TouchableOpacity onPress={onClose} className="rounded-full p-1">
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Parking Info */}
            <View className="mb-4 rounded-lg bg-blue-50 p-3">
              <Typography className="font-medium">{parking?.name}</Typography>
              <View className="mt-1 flex-row items-center">
                <Ionicons name="pricetag-outline" size={16} color="#3b82f6" />
                <Typography className="ml-1 text-blue-600">{parking?.price}/hr</Typography>
              </View>
            </View>

            {/* Time Selection */}
            <Typography className="mb-2 font-semibold">Select Time</Typography>
            <View className="mb-4 flex-row justify-between">
              <TouchableOpacity
                className="mr-2 flex-1 rounded-lg border border-gray-200 p-3"
                onPress={() => {
                  setActivePicker('start');
                  setDatePickerVisible(true);
                }}>
                <Typography className="mb-1 text-sm text-gray-500">Start Time</Typography>
                <Typography className="font-medium">{formatTime(startDate)}</Typography>
              </TouchableOpacity>

              <TouchableOpacity
                className="ml-2 flex-1 rounded-lg border border-gray-200 p-3"
                onPress={() => {
                  setActivePicker('end');
                  setDatePickerVisible(true);
                }}>
                <Typography className="mb-1 text-sm text-gray-500">End Time</Typography>
                <Typography className="font-medium">{formatTime(endDate)}</Typography>
              </TouchableOpacity>
            </View>

            {/* Spot Selection */}
            <Typography className="mb-2 font-semibold">Select Spot</Typography>
            <View className="mb-4 flex-row flex-wrap">
              {['A-1', 'A-2', 'B-1', 'B-2', 'C-1'].map((spot) => (
                <TouchableOpacity
                  key={spot}
                  className={`m-1 rounded-lg border p-2 ${
                    selectedSpot === spot ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onPress={() => setSelectedSpot(spot)}>
                  <Typography className={selectedSpot === spot ? 'text-blue-600' : 'text-gray-700'}>
                    {spot}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

            {/* Summary */}
            <View className="mb-4 rounded-lg bg-gray-50 p-3">
              <View className="mb-2 flex-row items-center justify-between">
                <Typography className="text-gray-600">Duration</Typography>
                <Typography className="font-medium">
                  {calculateDuration({ startDate, endDate })}
                </Typography>
              </View>
              <View className="flex-row items-center justify-between">
                <Typography className="text-gray-600">Total Price</Typography>
                <Typography className="text-lg font-bold">{calculatePrice()}</Typography>
              </View>
            </View>

            {/* Confirm Button */}
            <Button onPress={onPressConfirmBooking} disabled={isPending} size="lg">
              {user ? 'Confirm Booking' : 'Sign In to Book'}
            </Button>

            {/* Date/Time Picker would go here - in a real app you'd use a platform-specific picker */}
            {isDatePickerVisible && (
              <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
                <Typography className="mb-2 text-center font-medium">
                  Select {activePicker === 'start' ? 'Start' : 'End'} Time
                </Typography>
                {/* This is a placeholder - you would use a real date/time picker component here */}
                <View className="mb-4 flex-row justify-around">
                  <Button onPress={() => setDatePickerVisible(false)}>Cancel</Button>
                  <Button onPress={() => handleConfirmDate(new Date())}>Confirm</Button>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};
