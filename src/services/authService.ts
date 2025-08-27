import type { SignInFormDataType, SignInResponse } from '../type/auth.types';
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
