import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import type { UserAuthInfo } from '../components/auth/authContext';
import { refreshAccessToken } from './refreshApi';
import { logout } from './logoutService';

type FormDataValue = string | number | boolean | File | Blob;
type FormDataConvertible = Record<string, FormDataValue | FormDataValue[]>;

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

let authState: UserAuthInfo = {
  fullName: '',
  isLoggedIn: false,
  accessToken: '',
  userId: '',
};

// Function to update authState whenever it changes in context
export const setAxiosAuthState = (user: UserAuthInfo) => {
  authState = user;
};

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

function buildFormData(obj: FormDataConvertible): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if (item !== null && item !== undefined) {
          formData.append(`${key}[${idx}]`, String(item));
        }
      });
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  return formData;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (authState.accessToken) {
      config.headers['Authorization'] = `Bearer ${authState.accessToken}`;
    }

    if (
      config.data &&
      typeof config.data === 'object' &&
      !(config.data instanceof FormData)
    ) {
      const hasFile = Object.values(config.data).some(
        (value) => value instanceof File || value instanceof Blob
      );

      if (hasFile) {
        config.data = buildFormData(config.data);
        config.headers['Content-Type'] = 'multipart/form-data';
      }
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
        const refreshToken = sessionStorage.getItem('refreshToken');
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
