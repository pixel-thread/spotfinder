import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';

export const Security = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSavePassword = () => {
    // Here you would implement the API call to update password
    // For now, we'll just toggle back to view mode
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

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
            {new Date().toLocaleString()} • IP: 192.168.1.1
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
                {/* Current Password */}
                <View className="relative">
                  <Typography className="mb-1 text-sm text-gray-500">Current Password</Typography>
                  <View className="flex-row items-center">
                    <TextInput
                      className="flex-1 rounded-lg border border-gray-200 p-2 text-base dark:border-gray-800"
                      value={passwordForm.currentPassword}
                      onChangeText={(value) => handlePasswordChange('currentPassword', value)}
                      placeholder="Enter current password"
                      secureTextEntry={!passwordVisible.current}
                    />
                    <TouchableOpacity
                      className="absolute right-3"
                      onPress={() => togglePasswordVisibility('current')}>
                      <Ionicons
                        name={passwordVisible.current ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* New Password */}
                <View className="relative">
                  <Typography className="mb-1 text-sm text-gray-500">New Password</Typography>
                  <View className="flex-row items-center">
                    <TextInput
                      className="flex-1 rounded-lg border border-gray-200 p-2 text-base dark:border-gray-800"
                      value={passwordForm.newPassword}
                      onChangeText={(value) => handlePasswordChange('newPassword', value)}
                      placeholder="Enter new password"
                      secureTextEntry={!passwordVisible.new}
                    />
                    <TouchableOpacity
                      className="absolute right-3"
                      onPress={() => togglePasswordVisibility('new')}>
                      <Ionicons
                        name={passwordVisible.new ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password */}
                <View className="relative">
                  <Typography className="mb-1 text-sm">Confirm Password</Typography>
                  <View className="flex-row items-center">
                    <TextInput
                      className="flex-1 rounded-lg border border-gray-200 p-2 text-base dark:border-gray-800"
                      value={passwordForm.confirmPassword}
                      onChangeText={(value) => handlePasswordChange('confirmPassword', value)}
                      placeholder="Confirm new password"
                      secureTextEntry={!passwordVisible.confirm}
                    />
                    <TouchableOpacity
                      className="absolute right-3"
                      onPress={() => togglePasswordVisibility('confirm')}>
                      <Ionicons
                        name={passwordVisible.confirm ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="mt-2 flex-row gap-4">
                  <Button
                    className="flex-1 bg-gray-200 "
                    onPress={() => setIsChangingPassword(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-blue-600" onPress={handleSavePassword}>
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
