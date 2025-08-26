import axios from 'axios';
import type { BlogListResponse } from '../type/types';

const API_BASE = 'http://localhost:3000';

export const fetchBlogList = async (): Promise<BlogListResponse> => {
  try {
    const response = await axios.get<BlogListResponse>(`${API_BASE}/blogs`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
      error: extractErrorMessage(error),
    };
  }
};

function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as { error?: string } | undefined;
    if (apiError?.error) return apiError.error;
    return error.message;
  }
  return 'Unknown error occurred';
}
