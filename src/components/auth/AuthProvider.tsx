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
    id: '',
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
  const [isInitializing, setIsInitializing] = useState(true);

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
    const refreshToken = retrieveRefreshToken();
    if (refreshToken) {
      refreshAuthTokens(refreshToken);
    } else {
      clearAuthState();
      setIsInitializing(false);
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
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{ user, setUserInfo, clearAuthState, isInitializing }}
    >
      {children}
    </AuthContext.Provider>
  );
}
