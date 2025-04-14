import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { AuthContext } from '~/src/context/auth';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import { AuthContextI, UserT } from '~/src/types/auth/context';
import http from '~/src/utils/https';
import { getToken } from '~/src/utils/storage/token';

type Props = {
  children: Readonly<React.ReactNode>;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<UserT | null>(null);
  const [isInitial, setIsInitial] = React.useState(true);

  const { mutate, isPending: isAuthLoading } = useMutation({
    mutationKey: ['user'],
    mutationFn: () => http.get<UserT>(AUTH_ENDPOINT.GET_ME),
    onSuccess: (data) => {
      if (data.success) {
        setUser(data.data);
        return data.data;
      }
      setUser(null);
    },
    onError: () => {
      setUser(null);
    },
  });

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitial) {
        const token = await getToken();
        if (token) {
          mutate();
        } else {
          setUser(null);
        }
        setIsInitial(false);
      }
    };

    initializeAuth();
  }, [isInitial, mutate]);

  const value: AuthContextI = {
    user,
    isAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
