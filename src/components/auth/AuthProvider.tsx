import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';

export type User = {
  fullName: string;
  isLoggedIn: boolean;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ fullName: '', isLoggedIn: false });

  const login = (fullName: string) => {
    setUser({ fullName, isLoggedIn: true });
  };

  const logout = () => {
    setUser({ fullName: '', isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
