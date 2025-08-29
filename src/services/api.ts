import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

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
