// services/authService.ts
import { clearAuthStorage } from '../utils/storage';
import { setAxiosAuthState } from './api';

export const logout = () => {
  clearAuthStorage();

  // Reset auth state in axios
  setAxiosAuthState({
    accessToken: '',
    userId: '',
  });

  // Navigate to signin
};
