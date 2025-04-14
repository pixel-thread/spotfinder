import { usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { useAuth } from '~/src/hooks/auth/useAuth';

type Props = {
  children: Readonly<React.ReactNode>;
};

const publicPaths = ['/register', '/'];

export const AuthGuard = ({ children }: Props) => {
  const { user, isAuthLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/');
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    if (publicPaths.includes(pathname) && user) {
      router.replace('/');
    }
  }, [pathname, user]);

  return <>{children}</>;
};
