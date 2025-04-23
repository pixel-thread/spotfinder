import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';

import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';

type PaymentMethod = {
  id: string;
  type: 'card' | 'upi' | 'wallet';
  name: string;
  details: string;
  icon: string;
  isDefault: boolean;
};

export const PaymentMethods = () => {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      details: 'Expires 12/25',
      icon: 'card-outline',
      isDefault: true,
    },
    {
      id: '2',
      type: 'upi',
      name: 'UPI',
      details: 'user@okbank',
      icon: 'cash-outline',
      isDefault: false,
    },
    {
      id: '3',
      type: 'wallet',
      name: 'Paytm Wallet',
      details: 'Connected',
      icon: 'wallet-outline',
      isDefault: false,
    },
  ]);

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header */}
        <View className="mb-6 flex-row items-center">
          <Typography variant="heading" className="text-xl font-bold">
            Payment Methods
          </Typography>
        </View>

        {/* Payment Methods List */}
        <View className="mb-6">
          {paymentMethods.map((method) => (
            <View
              key={method.id}
              className={`mb-3 rounded-lg border ${
                method.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              } p-4`}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View
                    className={`mr-3 rounded-full ${method.isDefault ? 'bg-blue-100' : 'bg-gray-100'} p-2`}>
                    <Ionicons
                      name={method.icon as any}
                      size={24}
                      color={method.isDefault ? '#3b82f6' : '#6b7280'}
                    />
                  </View>
                  <View>
                    <Typography className="font-medium">{method.name}</Typography>
                    <Typography className="text-sm text-gray-500">{method.details}</Typography>
                  </View>
                </View>
                <View className="flex-row items-center">
                  {method.isDefault ? (
                    <View className="rounded-full bg-blue-100 px-3 py-1">
                      <Typography className="text-xs text-blue-600">Default</Typography>
                    </View>
                  ) : (
                    <TouchableOpacity
                      className="mr-2 rounded-full bg-gray-100 p-2"
                      onPress={() => setDefaultPaymentMethod(method.id)}>
                      <Ionicons name="checkmark-outline" size={16} color="#6b7280" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    className="rounded-full bg-gray-100 p-2"
                    onPress={() => removePaymentMethod(method.id)}>
                    <Ionicons name="trash-outline" size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Add New Payment Method */}
        <Button className="mb-6 bg-blue-600" onPress={() => router.push('/account')}>
          <View className="flex-row items-center">
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Typography className="ml-2 text-white">Add Payment Method</Typography>
          </View>
        </Button>

        {/* Accepted Payment Methods */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-3 px-2 text-gray-500">
            ACCEPTED PAYMENT METHODS
          </Typography>
          <View className="flex-row flex-wrap items-center justify-around rounded-lg border border-gray-200 p-4">
            <View className="m-2 items-center">
              <View className="h-10 w-16 items-center justify-center">
                <Ionicons name="card-outline" size={32} color="#6b7280" />
              </View>
              <Typography className="mt-1 text-xs text-gray-500">Credit Card</Typography>
            </View>
            <View className="m-2 items-center">
              <View className="h-10 w-16 items-center justify-center">
                <Ionicons name="cash-outline" size={32} color="#6b7280" />
              </View>
              <Typography className="mt-1 text-xs text-gray-500">UPI</Typography>
            </View>
            <View className="m-2 items-center">
              <View className="h-10 w-16 items-center justify-center">
                <Ionicons name="wallet-outline" size={32} color="#6b7280" />
              </View>
              <Typography className="mt-1 text-xs text-gray-500">Wallet</Typography>
            </View>
            <View className="m-2 items-center">
              <View className="h-10 w-16 items-center justify-center">
                <Ionicons name="phone-portrait-outline" size={32} color="#6b7280" />
              </View>
              <Typography className="mt-1 text-xs text-gray-500">Net Banking</Typography>
            </View>
          </View>
        </View>

        {/* Payment Security */}
        <View className="rounded-lg bg-gray-50 p-4">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="shield-checkmark-outline" size={20} color="#3b82f6" />
            <Typography className="ml-2 font-medium">Secure Payments</Typography>
          </View>
          <Typography className="text-sm text-gray-600">
            All payment information is encrypted and securely stored. We use industry-standard
            security measures to protect your financial data.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};
