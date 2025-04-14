import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '~/src/utils/validation/auth';
import { useMutation } from '@tanstack/react-query';
import http from '~/src/utils/https';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import { logger } from '~/src/utils/logger';
import { saveToken } from '~/src/utils/storage/token';
import { useAuth } from '~/src/hooks/auth/useAuth';

import { toast } from '../../ui/toast';
import { Input } from '../../ui/input';
import { View } from 'react-native';
import { Button } from '../../ui/button';
import { registerSchema } from '~/src/utils/validation/auth/registeSchema';

type FormValue = {
  phone: string;
  password: string;
  email: string;
  name: string;
  confirmPassword: string;
};

type LoginUser = {
  data: null;
};

export const RegisterForm = () => {
  const { refresh } = useAuth();
  const form = useForm<FormValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValue) => http.post<LoginUser>(AUTH_ENDPOINT.POST_REGISTER, data),
    onSuccess: async (data) => {
      if (data.success) {
        logger<string>('Login Successfull');
        if (data.token) {
          await saveToken(data.token);
          logger<string>('Token Set Successfully');
          refresh();
          return data.data;
        }
      }
      toast.error(data.message);
      logger({ message: data.message, error: data?.error });
      return data.data;
    },
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => mutate(data);

  return (
    <View className="space-y-6">
      <View>
        <Controller
          control={form.control}
          name="name"
          render={({ field: { onChange, value, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              value={value}
              label="Name"
              keyboardType="default"
              placeholder="Enter your phone number"
              error={form.formState.errors.name?.message}
            />
          )}
        />
      </View>
      <View>
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, value, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              value={value}
              label="Email"
              keyboardType="email-address"
              placeholder="Enter your phone number"
              error={form.formState.errors.email?.message}
            />
          )}
        />
      </View>
      <View>
        <Controller
          control={form.control}
          name="phone"
          render={({ field: { onChange, value, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              value={value}
              label="Phone Number"
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              error={form.formState.errors.phone?.message}
            />
          )}
        />
      </View>
      <View>
        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, value, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              value={value}
              label="Password"
              keyboardType="visible-password"
              placeholder="Enter your password"
              error={form.formState.errors.password?.message}
            />
          )}
        />
      </View>

      <View>
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field: { onChange, value, ...field } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              value={value}
              keyboardType="visible-password"
              placeholder="Enter your password"
              label="Confirm Password"
              error={form.formState.errors.confirmPassword?.message}
            />
          )}
        />
      </View>
      <Button
        disabled={isPending}
        className="w-full"
        onPress={form.handleSubmit(onSubmit)}
        size="lg">
        Login
      </Button>
    </View>
  );
};
