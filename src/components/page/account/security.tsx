import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { z } from 'zod';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { USER_ENDPOINT } from '~/src/libs/endpoints/user';
import http from '~/src/utils/https';
import { toast } from '../../ui/toast';
import { UserT } from '~/src/types/auth/context';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../../ui/input';
import { passwordValidation } from '~/src/utils/validation/passwordValidation';

const model = z
  .object({
    newPassword: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

type FormValues = z.infer<typeof model>;

export const Security = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(model),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      http.put<UserT>(USER_ENDPOINT.PUT_USER_PASSWORD.replace(':id', user?.id || ''), {
        password: data.newPassword,
      }),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        router.replace('/account/personal');
        setIsChangingPassword(false);
        return data.data;
      }
      toast.error(data.message);
      return data.data;
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => mutate(data);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      <View className="p-4">
        <View className="mb-6 flex-row items-center">
          <Typography variant="heading" className="text-xl font-bold">
            Security
          </Typography>
        </View>

        {/* Last Login Info */}
        <View className="mb-6 rounded-lg border border-gray-200 bg-blue-50 p-4 dark:border-gray-800 dark:bg-gray-950/30">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={20} color="#3b82f6" />
            <Typography className="ml-2 font-medium">Last Login</Typography>
          </View>
          <Typography className="mt-1 text-sm text-gray-600">
            {user?.lastLogin.split('T')[0]} • IP: 192.168.1.1
          </Typography>
        </View>

        {/* Password Section */}
        <View className="mb-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <View className="border-b border-gray-200 p-4 dark:border-gray-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="lock-closed-outline" size={20} color="#3b82f6" />
                <Typography className="ml-2 font-medium">Password</Typography>
              </View>
              {!isChangingPassword && (
                <TouchableOpacity
                  className="rounded-full bg-blue-50 p-2"
                  onPress={() => setIsChangingPassword(true)}>
                  <Ionicons name="create-outline" size={16} color="#3b82f6" />
                </TouchableOpacity>
              )}
            </View>

            {!isChangingPassword ? (
              <Typography className="mt-1 text-sm">Last changed 30 days ago</Typography>
            ) : (
              <View className="mt-4 space-y-4">
                {/* New Password */}
                <View className="relative">
                  <Typography className="mb-1 text-sm text-gray-500">New Password</Typography>
                  <View className="flex-row items-center">
                    <Controller
                      control={form.control}
                      name="newPassword"
                      render={({ field: { onChange, value, ...field } }) => (
                        <Input
                          {...field}
                          className="flex-1 rounded-lg border border-gray-200 p-2 text-base dark:border-gray-800"
                          error={form.formState.errors.newPassword?.message}
                          onChangeText={onChange}
                          value={value}
                          placeholder="Enter new password"
                        />
                      )}
                    />
                  </View>
                </View>

                {/* Confirm Password */}
                <View className="relative">
                  <Typography className="mb-1 text-sm">Confirm Password</Typography>
                  <View className="flex-row items-center">
                    <Controller
                      control={form.control}
                      name="confirmPassword"
                      render={({ field: { onChange, value, ...field } }) => (
                        <Input
                          {...field}
                          className="flex-1 rounded-lg border border-gray-200 p-2 text-base dark:border-gray-800"
                          value={value}
                          onChangeText={onChange}
                          placeholder="Confirm new password"
                          error={form.formState.errors.confirmPassword?.message}
                        />
                      )}
                    />
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="mt-2 flex-row gap-4">
                  <Button variant="secondary" onPress={() => setIsChangingPassword(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onPress={form.handleSubmit(onSubmit)}>
                    Update
                  </Button>
                </View>
              </View>
            )}
          </View>

          {/* Two-Factor Authentication */}
          <View className="border-b border-gray-200 p-4 dark:border-gray-800">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark-outline" size={20} color="#3b82f6" />
                <Typography className="ml-2 font-medium">Two-Factor Authentication</Typography>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={setTwoFactorEnabled}
                trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                thumbColor={twoFactorEnabled ? '#3b82f6' : '#f4f4f5'}
              />
            </View>
            <Typography className="mt-1 text-sm">
              Add an extra layer of security to your account
            </Typography>
          </View>

          {/* Biometric Authentication */}
          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="finger-print-outline" size={20} color="#3b82f6" />
                <Typography className="ml-2 font-medium">Biometric Login</Typography>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                thumbColor={biometricEnabled ? '#3b82f6' : '#f4f4f5'}
              />
            </View>
            <Typography className="mt-1 text-sm text-gray-600">
              Use fingerprint or face recognition to log in
            </Typography>
          </View>
        </View>

        {/* Device Management */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            DEVICE MANAGEMENT
          </Typography>

          <TouchableOpacity
            className="flex-row items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            onPress={() => router.push('/account')}>
            <View className="flex-row items-center">
              <Ionicons name="phone-portrait-outline" size={20} color="#3b82f6" />
              <Typography className="ml-2">Manage Devices</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Security Tips */}
        <View className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/30">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="information-circle-outline" size={20} color="#3b82f6" />
            <Typography className="ml-2 font-medium">Security Tips</Typography>
          </View>
          <View className="space-y-2">
            <Typography className="text-sm text-gray-600">
              • Use a strong, unique password for your account
            </Typography>
            <Typography className="text-sm text-gray-600">
              • Enable two-factor authentication for added security
            </Typography>
            <Typography className="text-sm text-gray-600">
              • Never share your password or verification codes
            </Typography>
            <Typography className="text-sm text-gray-600">
              • Check your login activity regularly
            </Typography>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
