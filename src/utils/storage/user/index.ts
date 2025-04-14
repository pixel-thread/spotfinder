import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_USER_KEY } from '~/src/libs/constants/auth';
import { UserT } from '~/src/types/auth/context';
import { removeToken } from '../token';

class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}

const USER_KEY = AUTH_USER_KEY;

const validateUser = (user: UserT): boolean => {
  return !!(user && user.id);
};

export const saveUser = async (user: UserT): Promise<void> => {
  if (!validateUser(user)) {
    throw new UserError('Invalid user data');
  }

  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error: any) {
    throw new UserError(`Failed to save user: ${error.message}`);
  }
};

export const getUserFromStorage = async (): Promise<UserT | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    if (!userData) return null;

    const user = JSON.parse(userData) as UserT;
    return validateUser(user) ? user : null;
  } catch (error: any) {
    throw new UserError(`Failed to retrieve user: ${error.message}`);
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    await removeToken();
  } catch (error: any) {
    throw new UserError(`Failed to remove user: ${error.message}`);
  }
};
