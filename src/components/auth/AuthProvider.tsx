import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';
import type { UserInfo } from './authContext';
import { refreshAccessToken } from '../../services/refreshApi';
import { updateAccessToken } from '../../services/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserInfo: UserInfo = {
    fullName: '',
    isLoggedIn: false,
  };
  const getStoredUserInfo = (): UserInfo => {
    try {
      const stored = localStorage.getItem('userInfo');
      if (stored) {
        return JSON.parse(stored) as UserInfo;
      }
    } catch (err) {
      console.error('Failed to parse userInfo from localStorage', err);
    }
    return initialUserInfo;
  };
  const [user, setUser] = useState<UserInfo>(getStoredUserInfo());

  const setUserInfo = (userInfo: UserInfo) => {
    setUser(userInfo);
    if (userInfo.isLoggedIn) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('refreshToken');
    }
  };

  const clearAuthState = () => {
    setUser(initialUserInfo);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    console.log(' useEffect called');
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      refreshAuthTokens(refreshToken);
    } else {
      clearAuthState();
    }
  }, []);

  function refreshAuthTokens(refreshToken: string) {
    refreshAccessToken(refreshToken)
      .then((res) => {
        localStorage.setItem(res.refreshToken, 'refreshToken');
        updateAccessToken(res.accessToken);
      })
      .catch((error) => {
        console.log('Error: ', error);
        clearAuthState();
      });
  }

  return (
    <AuthContext.Provider value={{ user, setUserInfo, clearAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
