import { useState } from 'react';
import { View, ScrollView, Switch } from 'react-native';

import { Typography } from '~/src/components/ui/typography';

export const NotificationSettings = () => {
  // Notification state
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,

    // Push notification categories
    bookingReminders: true,
    paymentAlerts: true,
    promotionalOffers: false,
    appUpdates: true,
    parkingAvailability: true,

    // Email notification categories
    emailReceipts: true,
    emailPromotions: false,
    emailSummary: true,

    // Time preferences
    doNotDisturb: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header */}
        <Typography variant="heading" className="mb-6 text-xl font-bold">
          Notifications
        </Typography>

        {/* Main Notification Channels */}
        <View className="mb-6 rounded-lg border border-gray-200">
          <View className="border-b border-gray-200 p-4">
            <View className="flex-row items-center justify-between">
              <Typography className="font-medium">Push Notifications</Typography>
              <Switch
                value={notifications.pushEnabled}
                onValueChange={() => toggleNotification('pushEnabled')}
                trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                thumbColor={notifications.pushEnabled ? '#3b82f6' : '#f4f4f5'}
              />
            </View>
            <Typography className="mt-1 text-sm text-gray-600">
              Receive notifications on your device
            </Typography>
          </View>

          <View className="border-b border-gray-200 p-4">
            <View className="flex-row items-center justify-between">
              <Typography className="font-medium">Email Notifications</Typography>
              <Switch
                value={notifications.emailEnabled}
                onValueChange={() => toggleNotification('emailEnabled')}
                trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                thumbColor={notifications.emailEnabled ? '#3b82f6' : '#f4f4f5'}
              />
            </View>
            <Typography className="mt-1 text-sm text-gray-600">
              Receive notifications via email
            </Typography>
          </View>

          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <Typography className="font-medium">SMS Notifications</Typography>
              <Switch
                value={notifications.smsEnabled}
                onValueChange={() => toggleNotification('smsEnabled')}
                trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                thumbColor={notifications.smsEnabled ? '#3b82f6' : '#f4f4f5'}
              />
            </View>
            <Typography className="mt-1 text-sm text-gray-600">
              Receive notifications via text message
            </Typography>
          </View>
        </View>

        {/* Push Notification Categories */}
        {notifications.pushEnabled && (
          <View className="mb-6">
            <Typography variant="caption" className="mb-2 px-2 text-gray-500">
              PUSH NOTIFICATION TYPES
            </Typography>

            <View className="rounded-lg border border-gray-200">
              <View className="border-b border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>Booking Reminders</Typography>
                  <Switch
                    value={notifications.bookingReminders}
                    onValueChange={() => toggleNotification('bookingReminders')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.bookingReminders ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>

              <View className="border-b border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>Payment Alerts</Typography>
                  <Switch
                    value={notifications.paymentAlerts}
                    onValueChange={() => toggleNotification('paymentAlerts')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.paymentAlerts ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>

              <View className="border-b border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>Promotional Offers</Typography>
                  <Switch
                    value={notifications.promotionalOffers}
                    onValueChange={() => toggleNotification('promotionalOffers')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.promotionalOffers ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>

              <View className="border-b border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>App Updates</Typography>
                  <Switch
                    value={notifications.appUpdates}
                    onValueChange={() => toggleNotification('appUpdates')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.appUpdates ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>

              <View className="p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>Parking Availability</Typography>
                  <Switch
                    value={notifications.parkingAvailability}
                    onValueChange={() => toggleNotification('parkingAvailability')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.parkingAvailability ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Email Notification Categories */}
        {notifications.emailEnabled && (
          <View className="mb-6">
            <Typography variant="caption" className="mb-2 px-2 text-gray-500">
              EMAIL NOTIFICATION TYPES
            </Typography>

            <View className="rounded-lg border border-gray-200">
              <View className="border-b border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>Receipts & Invoices</Typography>
                  <Switch
                    value={notifications.emailReceipts}
                    onValueChange={() => toggleNotification('emailReceipts')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.emailReceipts ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>

              <View className="border-b border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>Promotional Emails</Typography>
                  <Switch
                    value={notifications.emailPromotions}
                    onValueChange={() => toggleNotification('emailPromotions')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.emailPromotions ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>

              <View className="p-4">
                <View className="flex-row items-center justify-between">
                  <Typography>Monthly Summary</Typography>
                  <Switch
                    value={notifications.emailSummary}
                    onValueChange={() => toggleNotification('emailSummary')}
                    trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                    thumbColor={notifications.emailSummary ? '#3b82f6' : '#f4f4f5'}
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Do Not Disturb */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            TIME PREFERENCES
          </Typography>

          <View className="rounded-lg border border-gray-200 p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Typography className="font-medium">Do Not Disturb</Typography>
                <Typography className="mt-1 text-sm text-gray-600">
                  Mute notifications from 10:00 PM to 7:00 AM
                </Typography>
              </View>
              <Switch
                value={notifications.doNotDisturb}
                onValueChange={() => toggleNotification('doNotDisturb')}
                trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
                thumbColor={notifications.doNotDisturb ? '#3b82f6' : '#f4f4f5'}
              />
            </View>
          </View>
        </View>

        {/* Privacy Note */}
        <View className="rounded-lg bg-gray-50 p-4">
          <Typography className="font-medium">Privacy Information</Typography>
          <Typography className="mt-2 text-sm text-gray-600">
            You can change your notification preferences at any time. We respect your privacy and
            will only send you notifications based on your preferences.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};
