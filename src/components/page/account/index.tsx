import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';

export const ProfileDetail = () => {
  const { user, onLogout: signOut } = useAuth();
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Profile Header */}
      <View className="items-center border-b border-gray-100 bg-white p-6">
        <View className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          {user?.profilePic ? (
            <Image source={{ uri: user.profilePic }} className="h-full w-full" resizeMode="cover" />
          ) : (
            <View className="h-full w-full items-center justify-center">
              <Ionicons name="person" size={50} color="#9ca3af" />
            </View>
          )}
        </View>
        <Typography variant="heading" className="mb-1 text-xl font-bold">
          {user?.name || 'User Name'}
        </Typography>
        <Typography className="text-gray-500">{user?.auth.email || 'user@example.com'}</Typography>

        <TouchableOpacity
          className="mt-3 flex-row items-center rounded-full bg-blue-50 px-4 py-2"
          onPress={() => router.push('/account/personal/edit')}>
          <Ionicons name="create-outline" size={16} color="#3b82f6" />
          <Typography className="ml-1 text-blue-600">Edit Profile</Typography>
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View className="p-4">
        <Typography variant="caption" className="mb-2 px-2 text-gray-500">
          ACCOUNT SETTINGS
        </Typography>

        <View className="rounded-xl bg-white">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-100 p-4"
            onPress={() => router.push('/account/personal')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="person-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Personal Information</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-100 p-4"
            onPress={() => router.push('/account/payment')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="card-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Payment Methods</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4"
            onPress={() => router.push('/account/security')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="lock-closed-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Security</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* App Settings */}
      <View className="p-4">
        <Typography variant="caption" className="mb-2 px-2 text-gray-500">
          APP SETTINGS
        </Typography>

        <View className="rounded-xl bg-white">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-100 p-4"
            onPress={() => router.push('/account/notification')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="notifications-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Notifications</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-100 p-4"
            onPress={() => router.push('/account/appearance')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="color-palette-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Appearance</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4"
            onPress={() => router.push('/account/language')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="language-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Language</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Support */}
      <View className="p-4">
        <Typography variant="caption" className="mb-2 px-2 text-gray-500">
          SUPPORT
        </Typography>

        <View className="rounded-xl bg-white">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-100 p-4"
            onPress={() => router.push('/account/help')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="help-circle-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Help Center</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4"
            onPress={() => router.push('/account/about')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2">
                <Ionicons name="information-circle-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>About</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Out Button */}
      <View className="p-4">
        <Button className="bg-red-500" size="lg" onPress={signOut}>
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Typography className="ml-2 text-white">Sign Out</Typography>
          </View>
        </Button>
      </View>

      {/* Version Info */}
      <View className="items-center pb-8 pt-2">
        <Typography className="text-sm text-gray-400">Version 1.0.0</Typography>
      </View>
    </ScrollView>
  );
};
