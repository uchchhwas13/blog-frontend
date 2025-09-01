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
  const [user, setUser] = useState<UserInfo>(initialUserInfo);

  const setUserInfo = (userInfo: UserInfo) => {
    setUser(userInfo);
    console.log('setUserInfo called', userInfo);
    if (userInfo.isLoggedIn) {
      console.log('Saving userinfo', userInfo);
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
    const storedUser = localStorage.getItem('userInfo');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('storedUser', storedUser, 'refreshToken', refreshToken);
    let parsed: UserInfo;
    if (storedUser && refreshToken) {
      try {
        parsed = JSON.parse(storedUser) as UserInfo;
        setUser(parsed);
        initAuth(refreshToken);
      } catch {
        clearAuthState();
      }
    }
  }, []);

  function initAuth(refreshToken: string) {
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
