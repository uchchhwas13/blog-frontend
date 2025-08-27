import { createContext } from 'react';

type User = {
  fullName: string;
  isLoggedIn: boolean;
};

export type AuthContextType = {
  user: User;
  setUserInfo: (fullName: string) => void;
  clearAuthState: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
