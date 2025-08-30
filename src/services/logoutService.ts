// services/authService.ts
import { setAxiosAuthState } from './api';

export const logout = () => {
  // Clear tokens
  sessionStorage.removeItem('refreshToken');

  // Reset auth state in axios
  setAxiosAuthState({
    fullName: '',
    isLoggedIn: false,
    accessToken: '',
    userId: '',
  });

  // Navigate to signin
};
