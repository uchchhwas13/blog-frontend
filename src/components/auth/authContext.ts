import { createContext } from 'react';

type User = {
  fullName: string;
  isLoggedIn: boolean;
};

export type AuthContextType = {
  user: User;
  login: (fullName: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
