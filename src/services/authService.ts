import type {
  LogoutResponse,
  SignInFormDataType,
  SignInResponse,
} from '../type/auth.types';
import { API_BASE } from './constants';
import axios from 'axios';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export const signin = async (
  credentials: SignInFormDataType
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
      message: extractErrorMessage(error),
      error: extractErrorMessage(error),
    };
  }
};

export const logOut = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await axios.post<LogoutResponse>(
      `${API_BASE}/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return true;
  } catch {
    return false;
  }
};
