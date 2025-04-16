import { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Container } from '~/src/components/Container';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { BecomePartnerForm } from './BecomePartnerForm';

export default function BecomePartner() {
  const { user } = useAuth();
  const router = useRouter();

  // redirect user to login if not authenticated
  // useEffect(() => {
  //   if (!user) {
  //     router.push('/auth?redirect=become-partner');
  //   }
  // }, [user]);

  return (
    <Container className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {/* Header */}
          <View className="mb-8">
            <Typography variant="heading" className="text-center text-2xl">
              Become a Partner
            </Typography>
            <Typography variant="body" className="mt-2 text-center text-gray-600">
              Join our network of parking space providers and start earning
            </Typography>
          </View>

          {/* Benefits Section */}
          <View className="mb-8 rounded-xl bg-blue-50 p-4">
            <Typography variant="caption" className="mb-3 font-semibold text-blue-800">
              Benefits of becoming a partner
            </Typography>

            <View className="gap-y-3">
              {[
                { icon: 'cash-outline', text: 'Earn money from your unused parking spaces' },
                { icon: 'calendar-outline', text: 'Flexible scheduling - you decide when to rent' },
                { icon: 'shield-checkmark-outline', text: 'Secure payment processing' },
                { icon: 'people-outline', text: 'Join a growing community of parking providers' },
              ].map((item, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="mr-3 rounded-full bg-blue-200 p-2">
                    <Ionicons name={item.icon as any} size={18} color="#3b82f6" />
                  </View>
                  <Typography className="flex-1 text-gray-700">{item.text}</Typography>
                </View>
              ))}
            </View>
          </View>
          <BecomePartnerForm />

          {/* Process Information */}
          <View className="my-8">
            <Typography variant="caption" className="mb-4 font-semibold">
              What happens next?
            </Typography>

            <View className="gap-y-2">
              {[
                { number: '1', text: 'Submit your application' },
                { number: '2', text: 'Our team reviews your request' },
                { number: '3', text: 'If approved, set up your parking space details' },
                { number: '4', text: 'Start earning by renting your space' },
              ].map((step, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="mr-4 h-7 w-7 items-center justify-center rounded-full bg-blue-500">
                    <Typography variant="caption" className="font-medium text-white">
                      {step.number}
                    </Typography>
                  </View>
                  <Typography variant="label" className="flex-1 text-gray-700">
                    {step.text}
                  </Typography>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
