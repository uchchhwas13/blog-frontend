import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import type { UserAuthInfo } from '../components/auth/authContext';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

let authState: UserAuthInfo = {
  fullName: '',
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  userId: '',
};

// Function to update authState whenever it changes in context
export const setAxiosAuthState = (user: UserAuthInfo) => {
  authState = user;
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
        await axiosInstance.post('/user/refresh-access-token');
        return axiosInstance(originalRequest);
      } catch (err) {
        // Refresh failed → logout here
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
