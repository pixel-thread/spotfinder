import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { PlanCardSkeleton } from './planCardSkeleton';

import { Button } from '~/src/components/ui/button';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { useSubscription } from '~/src/hooks/subscription/useSubscription';
import { cn } from '~/src/libs';

// add a calculation of discount of 25 percent of the original price
const PlanCard = () => {
  const { user } = useAuth();
  const [selectedSlot, setSelectedSlot] = useState(5);
  const { plan, isLoading, onSubscribe } = useSubscription();
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const DISCOUNT_RATE = plan?.discount;

  useEffect(() => {
    if (plan && selectedSlot && DISCOUNT_RATE) {
      const original = plan.price * selectedSlot;
      const discountPerSlot = plan.price * (DISCOUNT_RATE / 100);
      const totalDiscount = selectedSlot * discountPerSlot;
      const discounted = Math.round(original - totalDiscount);

      setOriginalPrice(original);
      setDiscountedPrice(discounted);
    }
  }, [plan, selectedSlot, DISCOUNT_RATE]);

  const handleCheckout = () => {
    onSubscribe({ slot: selectedSlot });
  };

  // Show skeleton if loading or essential data is missing
  if (isLoading || !user || !plan?.discount || !plan?.price) {
    return <PlanCardSkeleton />;
  }

  return (
    <View className={cn('mx-auto w-full overflow-hidden rounded-xl bg-white shadow-md')}>
      <View className={cn('p-6')}>
        <Text className={cn('text-2xl font-bold text-gray-900')}>Premium</Text>
        <Text className={cn('mt-2 text-gray-600')}>Book up to 6,000 slots each month.</Text>

        <View className={cn('mt-6')}>
          <Text className={cn('text-sm font-medium text-gray-700')}>Slots</Text>
          <View
            className={cn('mt-2 flex-row items-center justify-between rounded-lg bg-gray-50 p-2')}>
            <TouchableOpacity
              className={cn('h-9 w-9 items-center justify-center rounded-full bg-gray-200')}
              onPress={() => setSelectedSlot((prev) => Math.max(1, prev - 1))}>
              <Ionicons name="remove" size={20} color="#4b5563" />
            </TouchableOpacity>
            <Text className={cn('text-xl font-semibold text-gray-900')}>{selectedSlot}</Text>
            <TouchableOpacity
              className={cn('h-9 w-9 items-center justify-center rounded-full bg-blue-500')}
              onPress={() => setSelectedSlot((prev) => prev + 5)}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className={cn('mt-6 border-t border-gray-100 pt-4')}>
          <View className={cn('flex-row items-center')}>
            <Text className={cn('mr-2 text-base text-gray-500 line-through')}>
              ₹{originalPrice}
            </Text>
            <View className={cn('rounded bg-green-100 px-2 py-1')}>
              <Text className={cn('text-xs font-medium text-green-700')}>{DISCOUNT_RATE}% OFF</Text>
            </View>
          </View>
          <Text className={cn('mt-1 text-3xl font-bold text-gray-900')}>
            ₹{discountedPrice}&nbsp;<Text className="text-xl font-normal text-gray-500">/mo</Text>
          </Text>
          <Text className={cn('mt-1 text-sm text-gray-500')}>
            Then, starts at ₹{originalPrice}/month
          </Text>
        </View>

        {/* Partner Benefits Section */}
        <View className={cn('mb-4 mt-6 rounded-xl bg-gray-50 p-4')}>
          <Text className={cn('mb-3 text-sm font-semibold text-gray-800')}>Partner Benefits</Text>

          <View className="gap-y-4">
            {[
              {
                icon: 'cash-outline',
                title: 'Earn Money',
                text: 'Generate income from your unused parking spaces',
              },
              {
                icon: 'calendar-outline',
                title: 'Flexible Schedule',
                text: 'You decide when to rent your spaces',
              },
              {
                icon: 'shield-checkmark-outline',
                title: 'Secure Payments',
                text: 'Get paid directly to your account',
              },
              {
                icon: 'trending-up-outline',
                title: 'Growing Demand',
                text: 'Join a marketplace with increasing user base',
              },
            ].map((item, index) => (
              <View key={index} className="flex-row">
                <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Ionicons name={item.icon as any} size={18} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className={cn('font-medium text-gray-800')}>{item.title}</Text>
                  <Text className={cn('text-gray-600')}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Button size="default" onPress={handleCheckout}>
          Buy Now
        </Button>

        <Text className={cn('mt-3 text-center text-xs text-gray-500')}>
          *See Offer Terms. Overages apply if slot limit is exceeded.{' '}
          <Text className={cn('text-blue-500')}>Learn more</Text>
        </Text>
      </View>
    </View>
  );
};

export default PlanCard;
