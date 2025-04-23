import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import { Typography } from '~/src/components/ui/typography';

type ThemeOption = 'system' | 'light' | 'dark';
type TextSizeOption = 'small' | 'medium' | 'large';

export const AppearanceSettings = () => {
  const { setColorScheme, colorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ThemeOption>('system');
  const [textSize, setTextSize] = useState<TextSizeOption>('medium');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      <View className="p-4">
        {/* Header */}
        <Typography
          variant="heading"
          className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-50">
          Appearance
        </Typography>

        {/* Theme Selection */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500 dark:text-gray-400">
            THEME
          </Typography>

          <View className="rounded-lg border border-gray-200 dark:border-gray-800">
            <TouchableOpacity
              className={`flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800 ${
                theme === 'system' ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => {
                setColorScheme('system');
                setTheme('system');
              }}>
              <View className="flex-row items-center">
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color={
                    theme === 'system' ? '#3b82f6' : colorScheme === 'dark' ? '#9ca3af' : '#6b7280'
                  }
                />
                <Typography
                  className={`ml-3 ${
                    theme === 'system'
                      ? 'font-medium text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                  System Default
                </Typography>
              </View>
              {theme === 'system' && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800 ${
                theme === 'light' ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => {
                setColorScheme('light');
                setTheme('light');
              }}>
              <View className="flex-row items-center">
                <Ionicons
                  name="sunny-outline"
                  size={20}
                  color={
                    theme === 'light' ? '#3b82f6' : colorScheme === 'dark' ? '#9ca3af' : '#6b7280'
                  }
                />
                <Typography
                  className={`ml-3 ${
                    theme === 'light'
                      ? 'font-medium text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                  Light
                </Typography>
              </View>
              {theme === 'light' && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-between p-4 ${
                theme === 'dark' ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => {
                setColorScheme('dark');
                setTheme('dark');
              }}>
              <View className="flex-row items-center">
                <Ionicons
                  name="moon-outline"
                  size={20}
                  color={
                    theme === 'dark' ? '#3b82f6' : colorScheme === 'dark' ? '#9ca3af' : '#6b7280'
                  }
                />
                <Typography
                  className={`ml-3 ${
                    theme === 'dark'
                      ? 'font-medium text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                  Dark
                </Typography>
              </View>
              {theme === 'dark' && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Text Size */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500 dark:text-gray-400">
            TEXT SIZE
          </Typography>

          <View className="rounded-lg border border-gray-200 dark:border-gray-800">
            <TouchableOpacity
              className={`flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800 ${
                textSize === 'small' ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => setTextSize('small')}>
              <Typography
                className={`${
                  textSize === 'small'
                    ? 'font-medium text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
                style={{ fontSize: 14 }}>
                Small
              </Typography>
              {textSize === 'small' && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800 ${
                textSize === 'medium' ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => setTextSize('medium')}>
              <Typography
                className={`${
                  textSize === 'medium'
                    ? 'font-medium text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
                style={{ fontSize: 16 }}>
                Medium
              </Typography>
              {textSize === 'medium' && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-between p-4 ${
                textSize === 'large' ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => setTextSize('large')}>
              <Typography
                className={`${
                  textSize === 'large'
                    ? 'font-medium text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
                style={{ fontSize: 18 }}>
                Large
              </Typography>
              {textSize === 'large' && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Accessibility */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500 dark:text-gray-400">
            ACCESSIBILITY
          </Typography>

          <View className="rounded-lg border border-gray-200 dark:border-gray-800">
            <TouchableOpacity
              className={`flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800 ${
                reduceMotion ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => setReduceMotion(!reduceMotion)}>
              <View>
                <Typography
                  className={`${reduceMotion ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                  Reduce Motion
                </Typography>
                <Typography className="text-sm text-gray-500 dark:text-gray-400">
                  Minimize animations throughout the app
                </Typography>
              </View>
              {reduceMotion ? (
                <View className="h-6 w-12 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
                  <View className="absolute right-1 h-5 w-5 rounded-full bg-white" />
                </View>
              ) : (
                <View className="h-6 w-12 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                  <View className="absolute left-1 h-5 w-5 rounded-full bg-white" />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center justify-between p-4 ${
                highContrast ? 'bg-blue-50 dark:bg-blue-950/30' : ''
              }`}
              onPress={() => setHighContrast(!highContrast)}>
              <View>
                <Typography
                  className={`${highContrast ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                  High Contrast
                </Typography>
                <Typography className="text-sm text-gray-500 dark:text-gray-400">
                  Increase contrast for better readability
                </Typography>
              </View>
              {highContrast ? (
                <View className="h-6 w-12 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
                  <View className="absolute right-1 h-5 w-5 rounded-full bg-white" />
                </View>
              ) : (
                <View className="h-6 w-12 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                  <View className="absolute left-1 h-5 w-5 rounded-full bg-white" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Preview */}
        <View className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <Typography className="mb-2 font-medium text-gray-900 dark:text-gray-100">
            Preview
          </Typography>
          <View
            className={`rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } border border-gray-200 p-4 dark:border-gray-700`}>
            <Typography
              className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              style={{ fontSize: textSize === 'small' ? 14 : textSize === 'medium' ? 16 : 18 }}>
              Sample Text
            </Typography>
            <Typography
              className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
              style={{ fontSize: textSize === 'small' ? 12 : textSize === 'medium' ? 14 : 16 }}>
              This is how your content will appear with the selected settings.
            </Typography>
            <View className="mt-2 flex-row">
              <TouchableOpacity
                className={`mr-2 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
                } px-3 py-2`}>
                <Typography className="text-white">Primary Button</Typography>
              </TouchableOpacity>
              <TouchableOpacity
                className={`rounded-lg ${
                  theme === 'dark' ? 'border border-gray-600 bg-gray-700' : 'bg-gray-100'
                } px-3 py-2`}>
                <Typography className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
                  Secondary
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Note */}
        <View className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <Typography className="text-sm text-gray-600 dark:text-gray-300">
            Changes to appearance settings will be applied immediately. Some settings may require
            restarting the app to take full effect.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};
