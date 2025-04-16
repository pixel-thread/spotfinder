import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from '~/src/components/ui/button';
import { TextArea } from '~/src/components/ui/textarea';
import { Typography } from '~/src/components/ui/typography';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { PARTNER_ENDPOINT } from '~/src/libs/endpoints/partner';
import http from '~/src/utils/https';
import { partnerRequestSchema } from '~/src/utils/validation/partner/requestPartner';

type FormValues = {
  userId: string;
  description: string;
};

export const BecomePartnerForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(partnerRequestSchema),
    defaultValues: {
      userId: user?.id,
      description: '',
    },
  });

  const { mutate, isPending, data } = useMutation({
    mutationKey: ['partner-requests'],
    mutationFn: async (data: FormValues) =>
      http.post(PARTNER_ENDPOINT.POST_REQUEST_PARTNER_SHIP, data),
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => mutate(data);
  return (
    <View className="flex flex-col gap-4">
      <View>
        <Typography variant="heading" className="font-semibold">
          Tell us about your parking space
        </Typography>
        <Typography variant="label" className="mb-2 text-gray-500">
          Please provide as much detail as possible to help us evaluate your application.
        </Typography>
      </View>

      {!data?.success && data?.success && (
        <View className="rounded-lg bg-destructive/20 p-3 text-center">
          <Typography variant="label" className="mt-2 text-xs text-destructive">
            {data?.message}
          </Typography>
        </View>
      )}
      <View>
        <Controller
          control={form.control}
          name="description"
          render={({ field: { ref, onChange, value, ...field } }) => (
            <TextArea
              {...field}
              onChangeText={onChange}
              value={value}
              multiline={true}
              placeholder="Describe your parking space, location, availability, and why you want to become a partner..."
              className="min-h-[150px] bg-gray-50 p-3"
              error={form.formState.errors.description?.message}
            />
          )}
        />
      </View>
      <Button
        className="w-full bg-blue-600"
        size="lg"
        onPress={form.handleSubmit(onSubmit)}
        disabled={isPending || !form.formState.isDirty}>
        {isPending ? 'Submitting...' : 'Submit Partner Application'}
      </Button>
    </View>
  );
};
