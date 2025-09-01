import { STORAGE_KEYS } from '../constants/storageKeys';

export const clearAuthStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};
