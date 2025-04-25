import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { Button } from '../../ui/button';

export const PersonalInformation = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      <View className="p-4">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <Typography variant="heading" className="text-xl font-bold">
            Personal Information
          </Typography>
          <Button variant="ghost" onPress={() => router.push('/account/personal/edit')}>
            <Ionicons name="create-outline" size={20} color="#3b82f6" />
          </Button>
        </View>

        {/* Form */}
        <View className="gap-y-4">
          {/* Name */}
          <View className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <Typography className="mb-1 text-sm text-gray-500">Full Name</Typography>
            <Typography className="text-base">{user?.name || 'Not provided'}</Typography>
          </View>

          {/* Email */}
          <View className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <Typography className="mb-1 text-sm text-gray-500">Email Address</Typography>
            <Typography className="text-base">{user?.auth?.email || 'Not provided'}</Typography>
          </View>

          {/* Phone */}
          <View className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <Typography className="mb-1 text-sm text-gray-500">Phone Number</Typography>
            <Typography className="text-base">{user?.auth?.phone || 'Not provided'}</Typography>
          </View>

          {/* Address */}
        </View>

        {/* Privacy Note */}
        <View className="mt-8 rounded-lg bg-gray-200 p-4 dark:bg-gray-800">
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
