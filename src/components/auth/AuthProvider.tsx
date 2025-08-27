import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';

export type User = {
  fullName: string;
  isLoggedIn: boolean;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ fullName: '', isLoggedIn: false });

  const setUserInfo = (fullName: string) => {
    setUser({ fullName, isLoggedIn: true });
  };

  const clearAuthState = () => {
    setUser({ fullName: '', isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ user, setUserInfo, clearAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
