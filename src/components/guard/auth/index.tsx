import { usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { useAuth } from '~/src/hooks/auth/useAuth';
import { getSkipAuth } from '~/src/utils/storage/auth/skipAuth';

type Props = {
  children: Readonly<React.ReactNode>;
};

const publicPaths = ['/auth/register', '/auth'];

export const AuthGuard = ({ children }: Props) => {
  const { user, isAuthLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/auth');
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    if (publicPaths.includes(pathname) && user) {
      router.replace('/');
    }
  }, [pathname, user]);

  return <>{children}</>;
};
