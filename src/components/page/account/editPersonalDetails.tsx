import { useState } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';

export const EditPersonalDetails = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.auth.email || '',
    phone: user?.auth.phone || '',
    address: user?.status || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSaving(true);
    // Implement API call to save changes here
    setTimeout(() => {
      setSaving(false);
      // Optionally navigate back or show a success message
    }, 1200);
  };

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
            <TextInput
              className="text-base"
              value={formData.name}
              onChangeText={(v) => handleChange('name', v)}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Email Address</Typography>
            <TextInput
              className="text-base"
              value={formData.email}
              onChangeText={(v) => handleChange('email', v)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Phone Number</Typography>
            <TextInput
              className="text-base"
              value={formData.phone}
              onChangeText={(v) => handleChange('phone', v)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          {/* Address */}
          <View className="rounded-lg border border-gray-200 p-4">
            <Typography className="mb-1 text-sm text-gray-500">Address</Typography>
            <TextInput
              className="text-base"
              value={formData.address}
              onChangeText={(v) => handleChange('address', v)}
              placeholder="Enter your address"
              multiline
            />
          </View>
        </View>

        {/* Save Button */}
        <Button className="mt-8 bg-blue-600" onPress={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
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
