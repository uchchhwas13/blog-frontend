import type {
  LogoutResponse,
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from '../type/auth.types';
import { API_BASE } from './constants';
import axios from 'axios';
import { extractError, extractMessage } from '../utils/extractErrorMessage';
import { authState } from './api';

export const signupUser = async (
  userInfo: SignUpPayload
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<SignUpResponse>(
      `${API_BASE}/user/signup`,
      userInfo,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: extractMessage(error),
      error: extractError(error),
    };
  }
};

export const signinUser = async (
  credentials: SignInPayload
): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      `${API_BASE}/user/signin`,
      credentials
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: extractMessage(error),
      error: extractError(error),
    };
  }
};

export const logOutUser = async (): Promise<boolean> => {
  try {
    await axios.post<LogoutResponse>(`${API_BASE}/user/logout`, {
      userId: authState.userId,
    });
    return true;
  } catch {
    return false;
  }
};
