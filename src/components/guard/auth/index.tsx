import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { useAuth } from '~/src/hooks/auth/useAuth';

type Props = {
  children: Readonly<React.ReactNode>;
};

export const AuthGuard = ({ children }: Props) => {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/');
    }
  }, [user, isAuthLoading]);

  return <>{children}</>;
};
