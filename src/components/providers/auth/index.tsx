import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { AuthContext } from '~/src/context/auth';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import { AuthContextI, UserT } from '~/src/types/auth/context';
import http from '~/src/utils/https';

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
    },
  });

  useEffect(() => {
    // making sure only once it will run for each initialize
    if (isInitial) {
      setIsInitial(false);
      mutate();
    }
  }, [mutate, isInitial]);

  const value: AuthContextI = {
    user,
    isAuthLoading,
  } as AuthContextI;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
