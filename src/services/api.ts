import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from './refreshApi';
import { logout } from './logoutService';
import { retrieveRefreshToken } from '../components/utils/storage';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

export type UserAuthInfo = {
  accessToken: string;
  userId: string;
};

let authState: UserAuthInfo = {
  accessToken: '',
  userId: '',
};

// Function to update authState whenever it changes in context
export const setAxiosAuthState = (user: UserAuthInfo) => {
  authState = user;
};

export const updateAccessToken = (accessToken: string) => {
  authState.accessToken = accessToken;
};

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (authState.accessToken) {
      config.headers['Authorization'] = `Bearer ${authState.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = retrieveRefreshToken();
        if (!refreshToken) {
          throw Error('Refresh token not available');
        }
        const response = await refreshAccessToken(refreshToken);
        authState.accessToken = response.accessToken;
        return axiosInstance(originalRequest);
      } catch (err) {
        logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
