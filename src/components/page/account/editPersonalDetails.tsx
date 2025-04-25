import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { Input } from '../../ui/input';
import { useMutation } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerSchema } from '~/src/utils/validation/auth/registeSchema';
import { toast } from '../../ui/toast';
import { USER_ENDPOINT } from '~/src/libs/endpoints/user';
import { useRouter } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';

const model = z.object({
  name: z.string(),
  email: z.string(),
});

type FormValue = z.infer<typeof model>;

export const EditPersonalDetails = () => {
  const { user } = useAuth();
  const router = useRouter();
  const form = useForm<FormValue>({
    resolver: zodResolver(model),
    defaultValues: {
      name: user?.name,
      email: user?.auth?.email,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValue) =>
      http.put(USER_ENDPOINT.PUT_USER.replace(':id', user?.id || ''), data),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.replace('/account/personal');
        return data.data;
      }
      toast.error(data.message);
      return data.data;
    },
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => mutate(data);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header */}
        <Typography variant="heading" className="mb-6 text-xl font-bold">
          Edit Personal Details
        </Typography>

        {/* Form */}
        <View className="gap-y-4">
          {/* Name */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Full Name</Typography>
            <Controller
              control={form.control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  className="text-base"
                  placeholder="Enter your name"
                  keyboardType="default"
                  value={value}
                  onChangeText={onChange}
                  error={form.formState.errors.name?.message}
                />
              )}
            />
          </View>

          {/* Email */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Email Address</Typography>
            <Controller
              control={form.control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  className="text-base"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  error={form.formState.errors.email?.message}
                />
              )}
            />
          </View>
        </View>

        {/* Save Button */}
        <Button
          onPress={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="mt-8 bg-blue-600">
          Update
        </Button>

        {/* Privacy Note */}
        <View className="mt-8 rounded-lg bg-gray-100 p-4">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="shield-checkmark-outline" size={20} color="#3b82f6" />
            <Typography className="ml-2 font-medium">Privacy Information</Typography>
          </View>
          <Typography className="text-sm text-gray-600">
            Your personal information is securely stored and will only be used to improve your
            experience with our service. We do not share your data with third parties without your
            consent.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};
