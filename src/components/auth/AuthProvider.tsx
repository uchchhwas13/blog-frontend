import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';
import type { UserAuthInfo } from './authContext';
import { setAxiosAuthState } from '../../services/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserAuthInfo: UserAuthInfo = {
    fullName: '',
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    userId: '',
  };
  const [user, setUser] = useState<UserAuthInfo>(initialUserAuthInfo);

  // Keep axios auth state in sync with context
  useEffect(() => {
    setAxiosAuthState(user);
  }, [user]);

  const setUserInfo = (userInfo: UserAuthInfo) => {
    setUser(userInfo);
  };

  const clearAuthState = () => {
    setUser(initialUserAuthInfo);
  };

  return (
    <AuthContext.Provider value={{ user, setUserInfo, clearAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
