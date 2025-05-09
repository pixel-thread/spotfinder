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

type FormInput = z.infer<typeof parkingSchema>;

const amenityOptions = [
  { id: 'security', label: 'Security', icon: 'shield-checkmark-outline' },
  { id: 'covered', label: 'Covered', icon: 'umbrella-outline' },
  { id: 'charging', label: 'EV Charging', icon: 'flash-outline' },
  { id: 'cctv', label: 'CCTV', icon: 'videocam-outline' },
];

export const AddParkingForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Request permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlePickImage = async () => {
    if (hasPermission === false) {
      alert('Permission to access media library is required!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uris = result.assets.map((asset) => asset.uri);
      const newImages = [...images, ...uris];
      setImages(newImages);
      form.setValue('gallery', newImages);
    }
  };

  const form = useForm<FormInput>({
    resolver: zodResolver(parkingSchema),
    defaultValues: {
      features: [], // string array for amenities
      userId: user?.id, // Add userId from auth
      image: `https://picsum.photos/seed/seed${Math.floor(Math.random() * 100)}/300/200`,
      gallery: Array(Math.floor(Math.random() * 3) + 1)
        .fill(0)
        .map(
          (_, j) => `https://picsum.photos/seed/seed${Math.floor(Math.random() * 100) + j}/300/200`
        ),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['parking'],
    mutationFn: (data: FormInput) =>
      http.post(PARKING_ENDPOINT.POST_ADD_PARKING, data, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push('/account/partner');
        return data?.data;
      }
      toast.error(data.message);
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
      {/* Amenities */}
      <View className="mt-6">
        <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
          Amenities
        </Typography>
        <View className="flex-row flex-wrap gap-3">
          {amenityOptions.map((amenity) => (
            <Controller
              key={amenity.id}
              control={form.control}
              name="features"
              render={({ field: { value, onChange } }) => {
                const checked = Array.isArray(value) && value.includes(amenity.id);
                return (
                  <TouchableOpacity
                    className={cn(
                      'flex-row items-center rounded-full border px-3 py-2',
                      checked ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                    )}
                    onPress={() => {
                      if (checked) {
                        onChange(value.filter((f: string) => f !== amenity.id));
                      } else {
                        onChange([...(value || []), amenity.id]);
                      }
                    }}>
                    <Ionicons
                      name={amenity.icon as any}
                      size={16}
                      color={checked ? '#3b82f6' : '#6b7280'}
                    />
                    <Typography
                      className={cn('ml-1 text-sm', checked ? 'text-blue-700' : 'text-gray-700')}>
                      {amenity.label}
                    </Typography>
                  </TouchableOpacity>
                );
              }}
            />
          ))}
        </View>
      </View>
      <View className="mt-6">
        <Typography variant="caption" className="mb-3 font-semibold text-gray-800">
          Photos
        </Typography>
        {/* Display selected images */}
        {images.length > 0 && (
          <View className="mb-4 flex-row flex-wrap gap-2">
            {images.map((uri, index) => (
              <View key={index} className="relative h-24 w-24 overflow-hidden rounded-md">
                <Image source={{ uri }} className="h-full w-full" />
                <TouchableOpacity
                  className="absolute right-1 top-1 rounded-full bg-black/50 p-1"
                  onPress={() => {
                    const newImages = images.filter((_, i) => i !== index);
                    setImages(newImages);
                    form.setValue('gallery', newImages);
                  }}>
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50"
          onPress={handlePickImage}>
          <Ionicons name="camera-outline" size={32} color="#6b7280" />
          <Typography className="mt-2 text-sm text-gray-600">
            {images.length > 0 ? 'Add More Photos' : 'Add Photos'}
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
          List Parking Space
        </Button>
      </View>
    </View>
  );
};
