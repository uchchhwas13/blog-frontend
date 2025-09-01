// services/authService.ts
import { STORAGE_KEYS } from '../components/constants/storageKeys';
import { setAxiosAuthState } from './api';

export const logout = () => {
  // Clear tokens
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

  // Reset auth state in axios
  setAxiosAuthState({
    accessToken: '',
    userId: '',
  });

  // Navigate to signin
};
