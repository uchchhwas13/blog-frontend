import { createContext } from 'react';

export type UserInfo = {
  fullName: string;
  isLoggedIn: boolean;
};

export type AuthContextType = {
  user: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  clearAuthState: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
