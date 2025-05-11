import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';

import { Ternary } from '../../Ternary';
import { Card } from '../../ui/card';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';

export const Account = () => {
  const { user, onLogout: signOut } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  const isPartner = useMemo(
    () => user?.role === 'PARTNER' || user?.role === 'SUPER_ADMIN',
    [user?.role]
  );

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      <View className="items-center p-6">
        <View className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          {user?.profilePic ? (
            <Image source={{ uri: user.profilePic }} className="h-full w-full" resizeMode="cover" />
          ) : (
            <View className="h-full w-full items-center justify-center">
              <Ionicons
                name="person"
                size={50}
                color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
              />
            </View>
          )}
        </View>
        <Typography variant="heading" className="text-xl font-bold">
          {user?.name || 'Guest User'}
        </Typography>
      </View>

      {/* Account Settings */}
      <View className="p-4">
        <Typography variant="caption" className="mb-2 px-2">
          ACCOUNT SETTINGS
        </Typography>

        <Card className="rounded-xl bg-white">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800"
            onPress={() => router.push('/account/personal')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full p-2 ">
                <Ionicons name="person-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Personal Information</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800"
            onPress={() => router.push('/account/payment')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
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
              <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
                <Ionicons name="lock-closed-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Security</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </Card>
      </View>
      {/* App Settings */}
      <View className="p-4">
        <Typography variant="caption" className="mb-2 px-2 text-gray-500">
          APP SETTINGS
        </Typography>

        <Card className="rounded-xl bg-white">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-200  p-4 dark:border-gray-800"
            onPress={() => router.push('/account/notification')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
                <Ionicons name="notifications-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Notifications</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-200  p-4 dark:border-gray-800"
            onPress={() => router.push('/account/appearance')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
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
              <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
                <Ionicons name="language-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>Language</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </Card>
      </View>
      {/* Legal */}
      {isPartner && (
        <View className="p-4">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            Partner
          </Typography>

          <Card className="rounded-xl bg-white">
            <TouchableOpacity
              className="flex-row items-center justify-between border-b border-gray-200  p-4 dark:border-gray-800"
              onPress={() => router.push('/account/partner')}>
              <View className="flex-row items-center">
                <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
                  <Ionicons name="help-circle-outline" size={20} color="#3b82f6" />
                </View>
                <Typography>Added Parking Lot</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-between p-4"
              onPress={() => router.push('/account/partner/add-parking')}>
              <View className="flex-row items-center">
                <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
                  <Ionicons name="information-circle-outline" size={20} color="#3b82f6" />
                </View>
                <Typography>Add New Parking</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </Card>
        </View>
      )}
      {/* Support */}
      <View className="p-4">
        <Typography variant="caption" className="mb-2 px-2 text-gray-500">
          SUPPORT
        </Typography>

        <Card className="rounded-xl bg-white">
          <TouchableOpacity
            className="flex-row items-center justify-between border-b border-gray-200  p-4 dark:border-gray-800"
            onPress={() => router.push('/account/help')}>
            <View className="flex-row items-center">
              <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
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
              <View className="mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-950/30">
                <Ionicons name="information-circle-outline" size={20} color="#3b82f6" />
              </View>
              <Typography>About</Typography>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </Card>
      </View>
      {/* Sign Out Button */}
      <View className="p-4">
        <Ternary
          condition={!user}
          trueComponent={
            <Button size="lg" onPress={() => router.push('/auth')}>
              <View className="flex-row items-center">
                <Ionicons name="log-in-outline" size={20} color="white" />
                <Typography className="ml-2 text-white">Sign In</Typography>
              </View>
            </Button>
          }
          falseComponent={
            <Button className="bg-red-500" size="lg" onPress={signOut}>
              <View className="flex-row items-center">
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Typography className="ml-2 text-white">Sign Out</Typography>
              </View>
            </Button>
          }
        />
      </View>
      {/* Version Info */}
      <View className="items-center pb-8 pt-2">
        <Typography className="text-sm text-gray-400">Version 1.0.0</Typography>
      </View>
    </ScrollView>
  );
};
