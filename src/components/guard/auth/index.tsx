import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useAuth } from '~/src/hooks/auth/useAuth';
import { SplashScreen } from '../../SplashScreen';
import { RoleT } from '~/src/types/auth/context';
import { logger } from '~/src/utils/logger';

// Define roles and route access
type RoleRoute = {
  url: string;
  role: RoleT[];
  needAuth?: boolean;
};

const routeRoles: RoleRoute[] = [
  {
    url: '/pricing',
    role: ['SUPERADMIN', 'USER', 'PARTNER'],
    needAuth: false,
  },
  {
    url: '/profile',
    role: ['SUPERADMIN', 'USER', 'PARTNER'],
    needAuth: true,
  },
  {
    url: '/',
    role: ['USER', 'PARTNER', 'SUPERADMIN'],
    needAuth: false,
  },
  {
    url: '/parking',
    role: ['USER', 'PARTNER', 'SUPERADMIN'],
    needAuth: false,
  },
];

const unauthOnlyPages = ['/auth', '/auth/register'];

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!user;
  const userRole = useMemo(() => user?.role ?? 'USER', [user]);

  // Route access control
  useEffect(() => {
    // const route = routeRoles.find((route) => route.url === pathname);
    // logger({
    //   pathName: pathname,
    //   isAuthenticated,
    //   role: userRole,
    //   route: route,
    // });
    if (isAuthLoading) return;
    const currentRoute = routeRoles.find((route) => {
      if (route.url === pathname) return true;
      if (route.url.endsWith('/*')) {
        const base = route.url.replace('/*', '');
        return pathname.startsWith(base);
      }
      return false;
    });

    if (currentRoute) {
      // If route needs auth and user isn't logged in
      if (currentRoute.needAuth && !isAuthenticated) {
        router.replace(`/auth?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // If route doesn't need auth, skip role check
      if (!currentRoute.needAuth) return;

      // Role check for authenticated user
      if (isAuthenticated) {
        const hasRole = currentRoute.role.includes(userRole);
        logger({ 'Has Needed Role': hasRole });
        if (!hasRole) {
          router.replace('/');
          return;
        }
      }
    }
  }, [pathname, isAuthenticated, userRole, isAuthLoading]);

  // Prevent logged-in users from accessing guest-only pages
  useEffect(() => {
    if (isAuthLoading) return;
    if (isAuthenticated && unauthOnlyPages.includes(pathname)) {
      router.replace('/');
    }
  }, [pathname, isAuthenticated, isAuthLoading]);

  if (isAuthLoading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};
