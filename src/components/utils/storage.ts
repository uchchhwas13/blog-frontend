import type { UserInfo } from '../auth/authContext';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const clearAuthStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const retrieveRefreshToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const retrieveUserInfo = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.USER_INFO);
};

export const saveRefreshToken = (refreshToken: string) => {
  localStorage.setItem(refreshToken, STORAGE_KEYS.REFRESH_TOKEN);
};

export const saveUserInfoInLocalStorage = (userInfo: UserInfo) => {
  localStorage.setItem(JSON.stringify(userInfo), STORAGE_KEYS.USER_INFO);
};
