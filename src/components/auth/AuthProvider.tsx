import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';
import type { UserInfo } from './authContext';
import { refreshAccessToken } from '../../services/refreshApi';
import { updateAccessToken } from '../../services/api';
import {
  clearAuthStorage,
  retrieveRefreshToken,
  retrieveUserInfo,
  saveRefreshToken,
  saveUserInfoInLocalStorage,
} from '../../utils/storage';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserInfo: UserInfo = {
    fullName: '',
    isLoggedIn: false,
  };
  const getStoredUserInfo = (): UserInfo => {
    try {
      const storedUserInfo = retrieveUserInfo();
      if (storedUserInfo) {
        return JSON.parse(storedUserInfo) as UserInfo;
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
      saveUserInfoInLocalStorage(userInfo);
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
    const refreshToken = retrieveRefreshToken();
    if (refreshToken) {
      refreshAuthTokens(refreshToken);
    } else {
      clearAuthState();
    }
  }, []);

  function refreshAuthTokens(refreshToken: string) {
    refreshAccessToken(refreshToken)
      .then((res) => {
        saveRefreshToken(res.refreshToken);
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
