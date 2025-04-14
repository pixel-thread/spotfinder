import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_USER_KEY } from '~/src/libs/constants/token';

class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}

const TOKEN_KEY = AUTH_USER_KEY;

const validateUser = (token: string): boolean => {
  // Basic validation - adjust according to your token format
  return typeof token === 'string' && token.length > 10;
};

export const saveUser = async (token: string): Promise<void> => {
  if (!validateUser(token)) {
    throw new UserError('Invalid token format');
  }

  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error: any) {
    throw new UserError(`Failed to save token: ${error.message}`);
  }
};

export const getUser = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token && validateUser(token) ? token : null;
  } catch (error: any) {
    throw new UserError(`Failed to retrieve token: ${error.message}`);
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error: any) {
    throw new UserError(`Failed to remove token: ${error.message}`);
  }
};
