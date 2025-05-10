import * as ImagePicker from 'expo-image-picker';

import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { Button } from '~/src/components/ui/button';
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
import { z } from 'zod';
import { toast } from '~/src/components/ui/toast';
import { logger } from '~/src/utils/logger';

type FormInput = z.infer<typeof parkingSchema>;

type Amenity = {
  id: string;
  label: string;
  icon?: string;
};

type ImageI = {
  uri: string;
  name: string | null | undefined;
  type: 'image' | 'video' | 'livePhoto' | 'pairedVideo' | undefined;
};
const amenityOptions: Amenity[] = [
  { id: 'security', label: 'Security', icon: 'shield-checkmark-outline' },
  { id: 'covered', label: 'Covered', icon: 'umbrella-outline' },
  { id: 'charging', label: 'EV Charging', icon: 'flash-outline' },
  { id: 'cctv', label: 'CCTV', icon: 'videocam-outline' },
  { id: 'WiFi', label: 'WiFi', icon: 'wifi-outline' },
  { id: 'Washroom', label: 'Washroom', icon: '' },
];

export const AddParkingForm = () => {
  const { user } = useAuth();
  const [image, setImage] = useState<ImageI | null>(null); // Store a single image object or null
  const [parkingId, setParkingId] = useState<string>('bc8bdc32-5378-469d-84e1-1206f110f613');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Request permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const { mutate: onUpload } = useMutation({
    mutationFn: (data: FormData) =>
      http.put(PARKING_ENDPOINT.POST_ADD_PARKING_IMAGE.replace(':id', parkingId), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });

  const handlePickImage = async () => {
    if (hasPermission === false) {
      alert('Permission to access media library is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1, // single image
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setImage({
        uri: asset.uri,
        name: asset.fileName || asset.uri.split('/').pop() || 'photo.jpg',
        type: 'image',
      });
    }
  };

  const form = useForm({
    resolver: zodResolver(parkingSchema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      features: '',
      userId: user?.id || '',
      address: '',
      openHours: '',
      distance: '',
      pinCode: '',
      rating: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['parking'],
    mutationFn: (data: FormInput) =>
      http.post<{ id: string }>(PARKING_ENDPOINT.POST_ADD_PARKING, data),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        if (data?.data?.id) {
          setParkingId(data?.data?.id);

          // Upload images if available
          if (image) {
            const formData = new FormData();
            formData.append('image', {
              uri: image.uri,
              name: image.name,
              type: image.type,
            } as any);

            onUpload(formData); // Upload images after parking space is created
          }
        }
      } else {
        toast.error(data.message);
      }
    },
  });

  // Add a submit handler that includes the userId
  const onSubmit: SubmitHandler<FormInput> = (data) => mutate(data);

  return (
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
          <Typography className="mb-1 text-sm font-medium text-gray-700">Parking Name</Typography>
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
                error={form.formState.errors.name?.message}
              />
            )}
          />
        </View>

        <View className="mb-4">
          <Typography className="mb-1 text-sm font-medium text-gray-700">Address</Typography>
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
                error={form.formState.errors.address?.message}
              />
            )}
          />
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1">
            <Typography className="mb-1 text-sm font-medium text-gray-700">City</Typography>
            <Controller
              control={form.control}
              name="address"
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                  placeholder="Address"
                  {...field}
                  value={value}
                  onChangeText={onChange}
                  error={form.formState.errors.address?.message}
                />
              )}
            />
          </View>
          <View className="flex-1">
            <Typography className="mb-1 text-sm font-medium text-gray-700">Pin Code</Typography>
            <Controller
              control={form.control}
              name="pinCode"
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  {...field}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                  placeholder="ZIP Code"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  error={form.formState.errors.pinCode?.message}
                />
              )}
            />
          </View>
        </View>
      </View>
      <View className="mt-6">
        <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
          Pricing
        </Typography>

        <View className="mb-4">
          <Typography className="mb-1 text-sm font-medium text-gray-700">
            Hourly Rate (₹)
          </Typography>
          <Controller
            control={form.control}
            name="price"
            render={({ field: { onChange, value, ...field } }) => (
              <Input
                {...field}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                placeholder="e.g. 50"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                error={form.formState.errors.price?.message}
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
          <Typography className="mb-1 text-sm font-medium text-gray-700">
            Tell users about your parking space
          </Typography>
          <Controller
            control={form.control}
            name="description" // Changed from "address" to "description"
            render={({ field: { onChange, value, ...field } }) => (
              <Input
                {...field}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                placeholder="Describe your parking space..."
                error={form.formState.errors.description?.message}
                textAlignVertical="top"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>
      <View className="mt-6">
        <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
          Feature
        </Typography>
        <View className="mb-4">
          <Typography className="mb-1 text-sm font-medium text-gray-700">
            Tell users about your parking space
          </Typography>
          <Controller
            control={form.control}
            name="features" // Changed from "address" to "description"
            render={({ field: { onChange, value, ...field } }) => (
              <Input
                {...field}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                placeholder="Describe your parking space..."
                error={form.formState.errors.description?.message}
                textAlignVertical="top"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>
      <View className="mt-6">
        <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
          Photos
        </Typography>
        {/* Display selected images */}
        {image && (
          <View className="mb-4 flex-row flex-wrap gap-2">
            <View className="relative h-24 w-24 overflow-hidden rounded-md">
              <Image source={{ uri: image.uri }} className="h-full w-full" />
              <TouchableOpacity
                className="absolute right-1 top-1 rounded-full bg-black/50 p-1"
                onPress={() => setImage(null)}>
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50"
          onPress={handlePickImage}>
          <Ionicons name="camera-outline" size={32} color="#6b7280" />
          <Typography className="mt-2 text-sm text-gray-600">
            {image ? 'Add More Photos' : 'Add Photos'}
          </Typography>
          {hasPermission === false && (
            <Typography className="mt-1 text-xs text-red-500">
              Permission needed to access photos
            </Typography>
          )}
        </TouchableOpacity>
      </View>
      {/* Submit Button */}
      <View className="mt-8">
        <Button disabled={isPending} size="lg" onPress={form.handleSubmit(onSubmit)}>
          Add Parking
        </Button>
      </View>
    </View>
  );
};
