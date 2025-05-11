import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { Input } from '~/src/components/ui/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parkingSchema } from '~/src/utils/validation/parking';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { useMutation } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { PARKING_ENDPOINT } from '~/src/libs/endpoints/parking';
import { z } from 'zod';
import { toast } from '~/src/components/ui/toast';
import { useImagePicker } from '~/src/hooks/useImagePicker';
import { useRouter } from 'expo-router';

type FormInput = z.infer<typeof parkingSchema>;

export const AddParkingForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { image, hasPermission, pickFromLibrary, clearImage } = useImagePicker();

  const { mutate: onUpload, isPending: isUploading } = useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      http.put(PARKING_ENDPOINT.PUT_ADD_PARKING_IMAGE.replace(':id', id), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.push('/account/partner');
      } else {
        toast.error(data.message);
      }
    },
  });

  const form = useForm({
    resolver: zodResolver(parkingSchema),
    defaultValues: { userId: user?.id || '' },
    mode: 'all',
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['parking'],
    mutationFn: (data: FormInput) =>
      http.post<{ id: string }>(PARKING_ENDPOINT.POST_ADD_PARKING, data),
    onSuccess: (data) => {
      if (data.success) {
        const parking = data.data;
        if (parking?.id && image) {
          const formData = new FormData();
          formData.append('image', {
            uri: image.uri,
            name: image.name,
            type: image.type,
          } as any);
          onUpload({ data: formData, id: parking.id }); // Upload images after parking space is created
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
              name="city"
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                  placeholder="City"
                  {...field}
                  value={value}
                  onChangeText={onChange}
                  error={form.formState.errors.city?.message}
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
            name="features"
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
        {image ? (
          <View className="mb-4 flex-row flex-wrap gap-2">
            <View className="relative aspect-square w-full overflow-hidden rounded-md">
              <Image source={{ uri: image.uri }} className="h-full w-full" />
              <TouchableOpacity
                className="absolute right-1 top-1 rounded-full bg-black/50 p-1"
                onPress={() => clearImage()}>
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            className="flex h-32 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50"
            onPress={pickFromLibrary}>
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
        )}
      </View>
      {/* Submit Button */}
      <View className="mt-8">
        <Button disabled={isPending || isUploading} size="lg" onPress={form.handleSubmit(onSubmit)}>
          Add Parking
        </Button>
      </View>
    </View>
  );
};
