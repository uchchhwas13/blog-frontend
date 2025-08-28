import axios from 'axios';
import type { BlogDetailsResponse, BlogListResponse } from '../type/blog.types';
import { extractError, extractMessage } from '../utils/extractErrorMessage';
import { API_BASE } from './constants';

export const fetchBlogList = async (): Promise<BlogListResponse> => {
  try {
    const response = await axios.get<BlogListResponse>(`${API_BASE}/blogs`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: extractMessage(error),
      error: extractError(error),
    };
  }
};

export const fetchBlogDetails = async (
  id: string
): Promise<BlogDetailsResponse> => {
  try {
    const response = await axios.get<BlogDetailsResponse>(
      `${API_BASE}/blogs/${id}`
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
