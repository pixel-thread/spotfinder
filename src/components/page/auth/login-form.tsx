import { SubmitHandler, useForm, Form, Controller } from 'react-hook-form';
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

type FormValue = {
  phone: string;
  password: string;
};

type LoginUser = {
  data: null;
};

export const LoginForm = () => {
  const { refresh } = useAuth();
  const form = useForm<FormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValue) => http.post<LoginUser>(AUTH_ENDPOINT.POST_LOGIN, data),
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
    <View className="space-y-4">
      <View>
        <Controller
          control={form.control}
          name="phone"
          render={({ field: { onChange, value, ...field } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              {...field}
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
              onChangeText={onChange}
              value={value}
              {...field}
              keyboardType="visible-password"
              placeholder="Enter your password"
              label="Password"
              error={form.formState.errors.password?.message}
            />
          )}
        />
      </View>
      <Button
        disabled={isPending}
        className="w-full"
        onPress={form.handleSubmit(onSubmit)}
        size={'lg'}>
        Login
      </Button>
    </View>
  );
};
