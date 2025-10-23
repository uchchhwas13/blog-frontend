// src/api/authApi.ts
import axios from 'axios';
import type {
  RefreshTokenSuccessResponse,
  RefreshTokenResponse,
} from '../type/auth.types';
import { saveRefreshToken } from '../utils/storage';
import { API_BASE } from './constants';

const refreshAxios = axios.create({
  baseURL: API_BASE,
});

export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshTokenSuccessResponse> => {
  const response = await refreshAxios.post<RefreshTokenResponse>(
    '/user/token/refresh',
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
