import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Button } from '~/src/components/ui/button';
import { Container } from '~/src/components/Container';
import { Typography } from '~/src/components/ui/typography';
import { cn } from '~/src/libs';
import { Input } from '~/src/components/ui/input';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parkingSchema } from '~/src/utils/validation/parking';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { useMutation } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import { TextArea } from '~/src/components/ui/textarea';
import { z } from 'zod';
import { logger } from '~/src/utils/logger';

type FormInput = z.infer<typeof parkingSchema>;

const AddParking = () => {
  const { user } = useAuth();
  const router = useRouter();
  const form = useForm<FormInput>({
    resolver: zodResolver(parkingSchema),
    defaultValues: {
      name: 'Test Add',
      address: 'Meghalaya',
      price: 50,
      rating: [],
      distance: 'distance',
      available: 10,
      openHours: '8 am - 10 pm',
      description: 'description',
      image: 'https://picsum.photos/200/300/?blur',
      features: [],
      gallery: [
        'https://picsum.photos/200/300/?blur',
        'https://picsum.photos/200/300/?blur',
        'https://picsum.photos/200/300/?blur',
        'https://picsum.photos/200/300/?blur',
        'https://picsum.photos/200/300/?blur',
      ],
      userId: user?.id || '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ['parking'],
    mutationFn: (data: FormInput) => http.post(PARKING_ENDPOINT.POST_ADD_PARKING, data),
    onSuccess: (data) => {
      if (data.success) {
        router.push('/profile/partner');
      }
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => mutate(data);
  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          <Typography variant="heading" className="text-center text-2xl">
            Add New Parking Space
          </Typography>
          <Typography variant="body" className="mt-2 text-center text-gray-600">
            List your parking space and start earning
          </Typography>

          {/* Basic Information */}
          <View className="mt-6">
            <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
              Basic Information
            </Typography>

            <View className="mb-4">
              <Text className="mb-1 text-sm font-medium text-gray-700">Parking Name</Text>
              <Controller
                control={form.control}
                name="name"
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    placeholder="e.g. Downtown Secure Parking"
                    {...field}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View className="mb-4">
              <Text className="mb-1 text-sm font-medium text-gray-700">Address</Text>
              <Controller
                control={form.control}
                name="address"
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    placeholder="Street Address"
                    {...field}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="mb-1 text-sm font-medium text-gray-700">City</Text>

                <Controller
                  control={form.control}
                  name="address"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                      placeholder="City"
                      {...field}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-sm font-medium text-gray-700">ZIP Code</Text>
                <Controller
                  control={form.control}
                  name="address"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      {...field}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                      placeholder="ZIP Code"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="number-pad"
                    />
                  )}
                />
              </View>
            </View>
          </View>

          {/* Pricing */}
          <View className="mt-6">
            <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
              Pricing
            </Typography>

            <View className="mb-4">
              <Text className="mb-1 text-sm font-medium text-gray-700">Hourly Rate (₹)</Text>
              <Controller
                control={form.control}
                name="address"
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    {...field}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    placeholder="e.g. 50"
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>

          {/* Description */}
          <View className="mt-6">
            <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
              Description
            </Typography>

            <View className="mb-4">
              <Text className="mb-1 text-sm font-medium text-gray-700">
                Tell users about your parking space
              </Text>
              <Controller
                control={form.control}
                name="address"
                render={({ field: { onChange, value, ...field } }) => (
                  <TextArea
                    {...field}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    placeholder="Describe your parking space..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>

          {/* Amenities */}
          <View className="mt-6">
            <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
              Amenities
            </Typography>

            <View className="flex-row flex-wrap gap-3">
              {[
                { id: 'security', label: 'Security', icon: 'shield-checkmark-outline' },
                { id: 'covered', label: 'Covered', icon: 'umbrella-outline' },
                { id: 'charging', label: 'EV Charging', icon: 'flash-outline' },
                { id: 'cctv', label: 'CCTV', icon: 'videocam-outline' },
              ].map((amenity) => (
                <TouchableOpacity
                  key={amenity.id}
                  className={cn(
                    'flex-row items-center rounded-full border px-3 py-2'
                    // watchFeatures.amenities[amenity.id as keyof typeof formData.amenities]
                    //   ? 'border-blue-500 bg-blue-50'
                    //   : 'border-gray-300 bg-white'
                  )}
                  // onPress={() => toggleAmenity(amenity.id)}
                >
                  <Ionicons
                    name={amenity.icon as any}
                    size={16}
                    // color={
                    //   formData.amenities[amenity.id as keyof typeof formData.amenities]
                    //     ? '#3b82f6'
                    //     : '#6b7280'
                    // }
                  />
                  <Text
                    className={cn(
                      'ml-1 text-sm'
                      // formData.amenities[amenity.id as keyof typeof formData.amenities]
                      //   ? 'text-blue-700'
                      //   : 'text-gray-700'
                    )}>
                    {amenity.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Photos */}
          <View className="mt-6">
            <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
              Photos
            </Typography>

            <TouchableOpacity
              className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50"
              onPress={() => console.log('Add photo')}>
              <Ionicons name="camera-outline" size={32} color="#6b7280" />
              <Text className="mt-2 text-sm text-gray-600">Add Photos</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <View className="mt-8">
            <Button disabled={isPending} size="lg" onPress={form.handleSubmit(onSubmit)}>
              List Parking Space
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddParking;
