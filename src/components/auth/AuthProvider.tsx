import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';
import type { UserInfo } from './authContext';
import { refreshAccessToken } from '../../services/refreshApi';
import { updateAccessToken } from '../../services/api';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { clearAuthStorage } from '../utils/storage';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserInfo: UserInfo = {
    fullName: '',
    isLoggedIn: false,
  };
  const getStoredUserInfo = (): UserInfo => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_INFO);
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
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
    } else {
      clearAuthStorage();
    }
  };

  const clearAuthState = () => {
    setUser(initialUserInfo);
    clearAuthStorage();
  };

  useEffect(() => {
    console.log(' useEffect called');
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (refreshToken) {
      refreshAuthTokens(refreshToken);
    } else {
      clearAuthState();
    }
  }, []);

  function refreshAuthTokens(refreshToken: string) {
    refreshAccessToken(refreshToken)
      .then((res) => {
        localStorage.setItem(res.refreshToken, STORAGE_KEYS.REFRESH_TOKEN);
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
