import axios from 'axios';

export const extractError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as { error?: string } | undefined;
    if (apiError?.error) return apiError.error;
    return error.message;
  }
  return 'Unknown error occurred';
};

export const extractMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message;
  }
  return 'Something went wrong';
};
