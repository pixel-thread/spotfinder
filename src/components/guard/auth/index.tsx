import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

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
    const checkAndRedirect = async () => {
      const skipAuth = await getSkipAuth();

      if (skipAuth) {
        // If auth is skipped, redirect to home page
        router.push('/');
        return;
      }

      // Continue with normal auth flow if not skipped
      if (!isAuthLoading && !user) {
        router.push('/auth');
      }
    };

    checkAndRedirect();
  }, [user, isAuthLoading]);

  useEffect(() => {
    if (publicPaths.includes(pathname) && user && !isAuthLoading) {
      router.push('/');
    }
  }, [pathname, user, isAuthLoading]);

  return <>{children}</>;
};
