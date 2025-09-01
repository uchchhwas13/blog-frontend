import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';
import type { UserAuthInfo } from './authContext';
import { refreshAccessToken } from '../../services/refreshApi';
import { setAxiosAuthState } from '../../services/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserAuthInfo: UserAuthInfo = {
    fullName: '',
    isLoggedIn: false,
    accessToken: '',
    userId: '',
  };
  const [user, setUser] = useState<UserAuthInfo>(initialUserAuthInfo);

  const setUserInfo = (userInfo: UserAuthInfo) => {
    setUser(userInfo);
    setAxiosAuthState(userInfo);
    console.log('setUserInfo called', userInfo);
    if (userInfo.isLoggedIn) {
      console.log('Saving userinfo', userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  };

  const clearAuthState = () => {
    setUser(initialUserAuthInfo);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    console.log(' useEffect called');
    const storedUser = localStorage.getItem('userInfo');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('storedUser', storedUser, 'refreshToken', refreshToken);
    let parsed: UserAuthInfo;
    if (storedUser && refreshToken) {
      try {
        parsed = JSON.parse(storedUser) as UserAuthInfo;
        initAuth(parsed, refreshToken);
      } catch {
        clearAuthState();
        return;
      }
    }
  }, []);

  function initAuth(parsed: UserAuthInfo, refreshToken: string) {
    console.log('initAuth called', parsed, 'refreshToken: ', refreshToken);
    refreshAccessToken(refreshToken)
      .then((res) => {
        const updated: UserAuthInfo = {
          ...parsed,
          accessToken: res.accessToken,
          isLoggedIn: true,
        };
        localStorage.setItem(res.refreshToken, 'refreshToken');
        setUserInfo(updated);
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
