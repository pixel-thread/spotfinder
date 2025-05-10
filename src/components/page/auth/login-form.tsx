import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm, Controller, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { toast } from '../../ui/toast';

import { useAuth } from '~/src/hooks/auth/useAuth';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import http from '~/src/utils/https';
import { logger } from '~/src/utils/logger';
import { saveToken } from '~/src/utils/storage/token';
import { loginSchema } from '~/src/utils/validation/auth';

type FormValue = {
  phone: string;
  otp?: string | undefined;
};

type LoginUser = {
  data: null;
};

export const LoginForm = () => {
  const { refresh, isAuthLoading } = useAuth();
  const [isShowOTP, setIsShowOTP] = React.useState(false);
  const [isPrevPhone, setIsPrevPhone] = React.useState<string>('');
  const form = useForm<FormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
    },
  });

  const watchPhone = useWatch({
    control: form.control,
    name: 'phone',
  });

  const { mutate: initLogin, isPending } = useMutation({
    mutationFn: (data: FormValue) => http.post<LoginUser>(AUTH_ENDPOINT.POST_LOGIN_INIT, data),
    onSuccess: async (data) => {
      if (data.success) {
        setIsPrevPhone(watchPhone);
        toast.success(data.message);
        setIsShowOTP(true);
        return data.data;
      }
      toast.error(data.message);
      return data.data;
    },
  });

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (data: FormValue) => http.post<LoginUser>(AUTH_ENDPOINT.POST_LOGIN, data),
    onSuccess: async (data) => {
      if (data.success) {
        if (data.token) {
          logger.info('Saving Token');
          await saveToken(data.token);
          logger.info('Token Saved');
          refresh();
          return data.data;
        }
      }
      toast.error(data.message);
      return data.data;
    },
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    if (isShowOTP) {
      mutateLogin(data);
      return;
    }
    initLogin(data);
  };

  useEffect(() => {
    if (watchPhone !== isPrevPhone) {
      if (isShowOTP) {
        setIsShowOTP(false);
      }
    }
  }, [watchPhone, isShowOTP]);

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

      {isShowOTP && (
        <View>
          <Controller
            control={form.control}
            name="otp"
            render={({ field: { onChange, value, ...field } }) => (
              <Input
                {...field}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
                placeholder="Enter your OTP"
                label="OTP"
                error={form.formState.errors.otp?.message}
              />
            )}
          />
        </View>
      )}
      <Button
        disabled={isPending || isPendingLogin || isAuthLoading}
        className="w-full"
        onPress={form.handleSubmit(onSubmit)}
        size="lg">
        {isShowOTP ? 'Login' : 'Send OTP'}
      </Button>
    </View>
  );
};
