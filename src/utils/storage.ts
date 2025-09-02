import type { UserInfo } from '../components/auth/authContext';
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
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const saveUserInfoInLocalStorage = (userInfo: UserInfo) => {
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
};
