import { createContext } from 'react';

export type UserAuthInfo = {
  fullName: string;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export type AuthContextType = {
  user: UserAuthInfo;
  setUserInfo: (userInfo: UserAuthInfo) => void;
  clearAuthState: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
