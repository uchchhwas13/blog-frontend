// src/api/authApi.ts
import axios from 'axios';
import type {
  RefreshTokenSuccessResponse,
  RefreshTokenResponse,
} from '../type/auth.types';
import { saveRefreshToken } from '../components/utils/storage';

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
    saveRefreshToken(data.refreshToken);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
  throw Error('Invalid refresh token');
};
