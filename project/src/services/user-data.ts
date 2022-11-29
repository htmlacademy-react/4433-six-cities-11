import {UserData} from '../types/user-data';

const USER_DATA_KEY_NAME = 'six-cities-user-data';

export const getUser = (): UserData | null => {
  const user = JSON.parse(localStorage.getItem(USER_DATA_KEY_NAME) as string) as UserData;
  return user || null;
};

export const saveUser = (userData: UserData): void => {
  localStorage.setItem(USER_DATA_KEY_NAME, JSON.stringify(userData));
};

export const dropUser = (): void => {
  localStorage.removeItem(USER_DATA_KEY_NAME);
};
