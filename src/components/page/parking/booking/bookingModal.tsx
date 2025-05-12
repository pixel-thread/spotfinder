import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { View, TouchableOpacity, Modal, Platform } from 'react-native';
import { z } from 'zod';

import { BookingModalSkeleton } from './bookingModalSkeleton';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import http from '~/src/utils/https';
import { parkingSchema } from '~/src/utils/validation/parking';
import { toast } from '~/src/components/ui/toast';
import { cn } from '~/src/libs';

import DateTimePicker from '@react-native-community/datetimepicker';

type ParkingDetail = z.infer<typeof parkingSchema>;

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  parkingId: string;
};

// Inside the BookingModal component, add this skeleton UI for loading state
export const BookingModal = ({ isOpen, onClose, parkingId }: BookingModalProps) => {
  const [noOfHour, setNoOfHour] = useState(1);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000)); // Default 1 hour
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activePicker, setActivePicker] = useState<'start' | 'end'>('start');
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

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

  const { isPending } = useMutation({
    mutationFn: () =>
      http.post(PARKING_ENDPOINT.POST_ADD_BOOKING.replace(':id', parkingId), {
        startTime: startDate,
        endTime: endDate,
        userId: user?.id,
      }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ['parking', parkingId] });
        onClose();
        return data.data;
      }
      toast.error(data.message);
    },
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const calculatePrice = () => {
    const hourlyRate: number = Number(parking?.price) || 0;
    return `₹${(hourlyRate * noOfHour).toFixed(2)}`;
  };
  const onPressConfirmBooking = () => {
    if (user) {
      // TODO: Implement booking logic
    }
    onClose();
  };

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
            {/* Start Time Input */}
            <View className="mb-4">
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Typography className="mb-1 text-sm text-gray-600">Date</Typography>
                  <TouchableOpacity
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                    onPress={() => {
                      setActivePicker('start');
                      setPickerMode('date');
                      setDatePickerVisible(true);
                    }}>
                    <Typography className="text-gray-900">{formatDate(startDate)}</Typography>
                  </TouchableOpacity>
                </View>
                <View className="flex-1">
                  <Typography className="mb-1 text-sm text-gray-600">Time</Typography>
                  <TouchableOpacity
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2"
                    onPress={() => {
                      setActivePicker('start');
                      setPickerMode('time');
                      setDatePickerVisible(true);
                    }}>
                    <Typography className="text-gray-900">{formatTime(startDate)}</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Time Selection */}
            <View className={cn('mb-6')}>
              <Typography className="mb-2 font-semibold">Select Hours</Typography>
              <View
                className={cn('flex-row items-center justify-between rounded-lg bg-gray-50 p-2')}>
                <TouchableOpacity
                  className={cn('h-9 w-9 items-center justify-center rounded-full bg-gray-200')}
                  onPress={() => setNoOfHour((prev) => Math.max(1, prev - 1))}>
                  <Ionicons name="remove" size={20} color="#4b5563" />
                </TouchableOpacity>
                <Typography className={cn('text-xl font-semibold text-gray-900')}>
                  {noOfHour}
                </Typography>
                <TouchableOpacity
                  className={cn('h-9 w-9 items-center justify-center rounded-full bg-blue-500')}
                  onPress={() => setNoOfHour((prev) => prev + 1)}>
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Summary */}
            <View className="mb-4 rounded-lg bg-gray-50 p-3">
              <View className="mb-2 flex-row items-center justify-between">
                <Typography className="text-gray-600">Start Time</Typography>
                <Typography className="font-medium">{formatTime(startDate)}</Typography>
              </View>
              <View className="mb-2 flex-row items-center justify-between">
                <Typography className="text-gray-600">End Time</Typography>
                <Typography className="font-medium">
                  {formatTime(new Date(startDate.getTime() + noOfHour * 60 * 60 * 1000))}
                </Typography>
              </View>
              <View className="mb-2 flex-row items-center justify-between">
                <Typography className="text-gray-600">Duration</Typography>
                <Typography className="font-medium">{noOfHour}h</Typography>
              </View>
              <View className="flex-row items-center justify-between">
                <Typography className="text-gray-600">Total Price</Typography>
                <Typography className="text-lg font-bold">{calculatePrice()}</Typography>
              </View>
            </View>
            {/* Confirm Button */}
            <Button
              className="rounded-xl"
              onPress={onPressConfirmBooking}
              disabled={isPending}
              size="lg">
              {user ? 'Confirm Booking' : 'Sign In to Book'}
            </Button>
            {/* Date/Time Picker */}
            {isDatePickerVisible && (
              <>
                {Platform.OS === 'android' && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={activePicker === 'start' ? startDate : endDate}
                    mode={pickerMode}
                    is24Hour
                    display="default"
                    onChange={(event, selectedDate) => {
                      setDatePickerVisible(false);
                      if (event.type === 'set' && selectedDate) {
                        if (activePicker === 'start') {
                          setStartDate(selectedDate);
                          // Ensure end time is after start time
                          if (selectedDate.getTime() >= endDate.getTime()) {
                            setEndDate(new Date(selectedDate.getTime() + 60 * 60 * 1000));
                          }
                        } else {
                          setEndDate(selectedDate);
                        }
                      }
                    }}
                  />
                )}

                {Platform.OS === 'ios' && (
                  <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
                    <Typography className="mb-2 text-center font-medium">
                      Select {activePicker === 'start' ? 'Start' : 'End'}{' '}
                      {pickerMode === 'date' ? 'Date' : 'Time'}
                    </Typography>
                    <View className="items-center justify-center">
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={activePicker === 'start' ? startDate : endDate}
                        mode={pickerMode}
                        is24Hour
                        display="spinner"
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            // Just update the temporary value for preview
                            if (activePicker === 'start') {
                              setStartDate(selectedDate);
                            } else {
                              setEndDate(selectedDate);
                            }
                          }
                        }}
                      />
                    </View>

                    <View className="mt-4 flex-row justify-around">
                      <Button
                        variant="outline"
                        onPress={() => setDatePickerVisible(false)}
                        className="px-6">
                        Cancel
                      </Button>
                      <Button onPress={() => setDatePickerVisible(false)} className="px-6">
                        Confirm
                      </Button>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};
