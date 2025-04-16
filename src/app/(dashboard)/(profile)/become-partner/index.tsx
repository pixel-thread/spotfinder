import { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Container } from '~/src/components/Container';
import { Button } from '~/src/components/ui/button';
import { Typography } from '~/src/components/ui/typography';
import { TextArea } from '~/src/components/ui/textarea';
import { toast } from '~/src/components/ui/toast';
import { useMutation } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { PARTNER_ENDPOINT } from '~/src/libs/endpoints/partner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { partnerRequestSchema } from '~/src/utils/validation/partner/requestPartner';
import { useAuth } from '~/src/hooks/auth/useAuth';
type FormValues = {
  userId: string;
  description: string;
};
export default function BecomePartnerPage() {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(partnerRequestSchema),
    defaultValues: {
      userId: user?.id,
      description: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ['partner-requests'],
    mutationFn: async (data: FormValues) =>
      http.post(PARTNER_ENDPOINT.POST_REQUEST_PARTNER_SHIP, data),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        return data.data;
      }
      toast.error(data.message);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => mutate(data);

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

            <View className="space-y-3">
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

          {/* Application Form */}
          <View className="mb-6">
            <Typography variant="caption" className="mb-4 font-semibold">
              Tell us about your parking space
            </Typography>

            <TextArea
              {...form.register('description')}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your parking space, location, availability, and why you want to become a partner..."
              className="min-h-[150px] bg-gray-50 p-3"
            />

            <Typography className="mt-2 text-xs text-gray-500">
              Please provide as much detail as possible to help us evaluate your application.
            </Typography>
          </View>

          {/* Process Information */}
          <View className="mb-8">
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
                    <Typography className="font-medium text-white">{step.number}</Typography>
                  </View>
                  <Typography className="flex-1 text-gray-700">{step.text}</Typography>
                </View>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <Button
            className="w-full bg-blue-600"
            size="lg"
            onPress={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Partner Application'}
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
}
