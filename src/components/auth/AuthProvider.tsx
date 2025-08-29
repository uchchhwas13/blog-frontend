import { useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';
import type { UserAuthInfo } from './authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserAuthInfo: UserAuthInfo = {
    fullName: '',
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    userId: '',
  };
  const [user, setUser] = useState<UserAuthInfo>(initialUserAuthInfo);

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
