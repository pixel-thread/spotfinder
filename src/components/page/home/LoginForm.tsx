import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Text,
  Button,
  XStack,
  YStack,
  Input,
  Label,
  Form,
  Spinner,
  Paragraph,
  H3,
  H6,
} from 'tamagui';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import http from '~/src/utils/https';
import { loginSchema } from '~/src/utils/validation/auth';
import { getToken, saveToken } from '~/src/utils/storage/token';

type FormValues = {
  phone: string;
  password: string;
};
export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<Required<FormValues>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '8787572702',
      password: '123Clashofclan@',
    },
  });

  const { isPending, mutate, status } = useMutation({
    mutationKey: ['user'],
    mutationFn: (data: FormValues) => http.post<{ token: string }>(AUTH_ENDPOINT.POST_LOGIN, data),
    onSuccess: async (data) => {
      if (data.success) {
        if (data.token) {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          saveToken(data.token);
        }
        return data.data;
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      console.log(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => mutate(data);

  return (
    <YStack>
      <H3 textAlign="center">Welcome Back!</H3>
      <Paragraph textAlign="center" className="text-gray-600">
        Please sign in to access your account
      </Paragraph>

      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <YStack space="$3">
          <YStack space="$2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              disabled={isPending}
              {...form.register('phone')}
              placeholder="Enter your phone number"
              autoCapitalize="none"
              keyboardType="phone-pad"
            />
            {form.formState.errors.phone && (
              <Text className="text-red-500">{form.formState.errors.phone.message}</Text>
            )}
          </YStack>

          <YStack space="$2">
            <Label htmlFor="password">Password</Label>
            <XStack alignItems="center" space="$2">
              <Input
                disabled={isPending}
                {...form.register('password')}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                flex={1}
              />
              <Button
                size="$3"
                icon={showPassword ? Eye : EyeOff}
                onPress={() => setShowPassword(!showPassword)}
                chromeless
              />
            </XStack>
            {form.formState.errors.password && (
              <Text className="text-red-500">{form.formState.errors.password.message}</Text>
            )}
          </YStack>

          <Form.Trigger asChild disabled={status === 'pending'}>
            <Button
              disabled={isPending}
              marginTop="$4"
              icon={status === 'pending' ? () => <Spinner /> : undefined}>
              <H6 fontWeight={'bold'} letterSpacing={'$5'}>
                Login
              </H6>
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </YStack>
  );
};
