import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import { Typography } from '~/src/components/ui/typography';

export const About = () => {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      <View className="p-4">
        {/* Header */}
        <Typography variant="heading" className="mb-6 text-xl font-bold">
          About
        </Typography>

        {/* App Info */}
        <View className="mb-6 items-center">
          <View className="mb-3 h-24 w-24 items-center justify-center rounded-xl bg-blue-500 dark:bg-blue-600">
            <Ionicons name="car" size={48} color="white" />
          </View>
          <Typography variant="heading" className="text-xl font-bold">
            Parking App
          </Typography>
          <Typography className="">Version 1.0.0</Typography>
        </View>

        {/* Description */}
        <View className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/30">
          <Typography className="text-center text-gray-600 dark:text-gray-300">
            Parking App helps you find and book parking spaces in your city with ease. Save time and
            avoid the hassle of finding parking spots.
          </Typography>
        </View>

        {/* Features */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            KEY FEATURES
          </Typography>

          <View className="rounded-lg border border-gray-200 dark:border-gray-800">
            <View className="border-b border-gray-200 p-4 dark:border-gray-800">
              <View className="flex-row items-center">
                <Ionicons name="search-outline" size={20} color="#3b82f6" />
                <Typography className="ml-3 font-medium">Find Parking</Typography>
              </View>
              <Typography className="ml-8 mt-1 text-sm">
                Easily search for parking spots near your destination
              </Typography>
            </View>

            <View className="border-b border-gray-200 p-4 dark:border-gray-800">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={20} color="#3b82f6" />
                <Typography className="ml-3 font-medium">Book in Advance</Typography>
              </View>
              <Typography className="ml-8 mt-1 text-sm text-gray-600">
                Reserve parking spots ahead of time
              </Typography>
            </View>

            <View className="border-b border-gray-200 p-4 dark:border-gray-800">
              <View className="flex-row items-center">
                <Ionicons name="card-outline" size={20} color="#3b82f6" />
                <Typography className="ml-3 font-medium">Easy Payments</Typography>
              </View>
              <Typography className="ml-8 mt-1 text-sm text-gray-600">
                Multiple secure payment options
              </Typography>
            </View>

            <View className="p-4">
              <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={20} color="#3b82f6" />
                <Typography className="ml-3 font-medium">Reminders</Typography>
              </View>
              <Typography className="ml-8 mt-1 text-sm text-gray-600">
                Get notified about your parking bookings
              </Typography>
            </View>
          </View>
        </View>

        {/* Company Info */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            COMPANY
          </Typography>

          <View className="rounded-lg border border-gray-200 dark:border-gray-800">
            <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <Typography>Website</Typography>
              <Ionicons name="open-outline" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <Typography>Privacy Policy</Typography>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <Typography>Terms of Service</Typography>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <Typography>Contact Us</Typography>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            FOLLOW US
          </Typography>

          <View className="flex-row justify-around rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <TouchableOpacity className="items-center">
              <View className="rounded-full bg-blue-50 p-3 dark:bg-blue-600/30">
                <Ionicons name="logo-twitter" size={24} color="#3b82f6" />
              </View>
              <Typography className="mt-1 text-sm">Twitter</Typography>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="rounded-full bg-blue-50 p-3 dark:bg-blue-600/30">
                <Ionicons name="logo-facebook" size={24} color="#3b82f6" />
              </View>
              <Typography className="mt-1 text-sm">Facebook</Typography>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="rounded-full bg-blue-50 p-3 dark:bg-blue-600/30">
                <Ionicons name="logo-instagram" size={24} color="#3b82f6" />
              </View>
              <Typography className="mt-1 text-sm">Instagram</Typography>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="rounded-full bg-blue-50 p-3 dark:bg-blue-600/30">
                <Ionicons name="logo-linkedin" size={24} color="#3b82f6" />
              </View>
              <Typography className="mt-1 text-sm">LinkedIn</Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Copyright */}
        <View className="items-center pb-4 pt-2">
          <Typography className="text-sm text-gray-400">
            © 2023 Parking App. All rights reserved.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};
