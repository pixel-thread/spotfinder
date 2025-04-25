import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { SplashScreen } from '../../SplashScreen';
import { Ternary } from '../../Ternary';
import { toast } from '../../ui/toast';

import { AuthContext } from '~/src/context/auth';
import { AUTH_ENDPOINT } from '~/src/libs/endpoints/auth';
import { AuthContextI, UserT } from '~/src/types/auth/context';
import http from '~/src/utils/https';
import { logger } from '~/src/utils/logger';
import { getSkipAuth } from '~/src/utils/storage/auth/skipAuth';
import { getToken, removeToken } from '~/src/utils/storage/token';
import { getUserFromStorage, removeUser, saveUser } from '~/src/utils/storage/user';

type Props = {
  children: Readonly<React.ReactNode>;
};

const onSuccessLogout = async () => {
  try {
    await removeUser();
  } catch (error) {
    logger.error({ message: 'Failed to logout', error });
    toast.error('Failed to logout');
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<UserT | null>(null);
  const [isInitial, setIsInitial] = React.useState(true);

  const { mutate, isPending: isAuthLoading } = useMutation({
    mutationKey: ['user'],
    mutationFn: () => http.get<UserT>(AUTH_ENDPOINT.GET_ME),
    onSuccess: async (data) => {
      logger.info({ isUserSuccessFetch: data.success, data: data.data });
      if (data.success) {
        logger.log({ data: data.data });
        const userData = data.data;
        setUser(userData);
        if (userData) {
          logger.info('Saving User To Storage after fetching');
          await saveUser(userData);
          logger.info('Initializing Auth Completed');
          return userData;
        }
      }
      removeToken();
      logger.error('User failed to verify');
      setUser(null);
    },
    onError: (error) => {
      setUser(null);
      logger.error({ message: 'Fetching user failed', error });
      toast.error('Failed to fetch user');
    },
  });

  const verifyUser = async () => {
    try {
      const token = await getToken();
      const isSkipLogin = await getSkipAuth();
      if (isSkipLogin && !token) {
        logger.info('Skipping Auth');
        return;
      }

      // const userFromStorage = await getUserFromStorage();

      // if (!userFromStorage) {
      //   logger.info('Setting User From Storage');
      //   setUser(userFromStorage);
      //   logger.info('User Set From Storage');
      //   logger.info('Initializing Auth Completed');
      //   return;
      // }

      if (token) {
        mutate();
        logger.info('Getting User From Token');
      } else {
        setUser(null);
        logger.info('No token or user found in storage');
      }
    } catch (error) {
      setUser(null);
      logger.error({ message: 'Error verifying user', error });
    } finally {
      setIsInitial(false);
    }
  };

  const { mutate: onLogout, isPending: isLogoutPending } = useMutation({
    mutationFn: () => http.post(AUTH_ENDPOINT.POST_LOGOUT),
    onSuccess: async () => {
      onSuccessLogout();
      setUser(null);
      logger.info('Logout Successfull');
    },
    onError: (error) => {
      onSuccessLogout();
      setUser(null);
      logger.error({ message: 'Failed to logout but still logged locally', error });
      toast.error('Failed to logout');
    },
  });

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitial) {
        logger.info('Initializing Auth');
        await verifyUser();
      }
    };

    initializeAuth();
  }, [isInitial, mutate, verifyUser]);

  const isLoading = isAuthLoading || isLogoutPending;
  const value: AuthContextI = {
    user,
    onLogout,
    isAuthLoading: isLoading,
    refresh: verifyUser,
  };

  return (
    <AuthContext.Provider value={value}>
      <Ternary condition={isLoading} trueComponent={<SplashScreen />} falseComponent={children} />
    </AuthContext.Provider>
  );
};
