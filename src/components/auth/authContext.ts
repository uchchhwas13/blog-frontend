import { createContext } from 'react';

export type UserInfo = {
  id: string;
  fullName: string;
  isLoggedIn: boolean;
};

export type AuthContextType = {
  user: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  clearAuthState: () => void;
  isInitializing: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
