// src/api/authApi.ts
import axios from 'axios';
import type {
  RefreshTokenSuccessResponse,
  RefreshTokenResponse,
} from '../type/auth.types';

const refreshAxios = axios.create({
  baseURL: 'http://localhost:3000',
});

export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshTokenSuccessResponse> => {
  const response = await refreshAxios.post<RefreshTokenResponse>(
    '/user/refresh-access-token',
    {
      refreshToken,
    }
  );
  if (response.data.data) {
    const data = response.data.data;
    sessionStorage.setItem('refreshToken', data.refreshToken);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
  throw Error('Invalid refresh token');
};
