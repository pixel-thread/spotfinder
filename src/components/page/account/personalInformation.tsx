import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';

export const PersonalInformation = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.auth.email || '',
    phone: user?.auth.email || '',
    address: user?.role || '',
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header */}
        <View className="mb-6 flex-row items-center">
          <Typography variant="heading" className="text-xl font-bold">
            Personal Information
          </Typography>
          <TouchableOpacity
            className="ml-auto rounded-full bg-blue-50 p-2"
            onPress={() => router.push('/account/personal/edit')}>
            <Ionicons name="create-outline" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="gap-y-4">
          {/* Name */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Full Name</Typography>
            <Typography className="text-base">{formData.name || 'Not provided'}</Typography>
          </View>

          {/* Email */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Email Address</Typography>
            <Typography className="text-base">{formData.email || 'Not provided'}</Typography>
          </View>

          {/* Phone */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Phone Number</Typography>
            <Typography className="text-base">{formData.phone || 'Not provided'}</Typography>
          </View>

          {/* Address */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Address</Typography>
            <Typography className="text-base">{formData.address || 'Not provided'}</Typography>
          </View>
        </View>

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

