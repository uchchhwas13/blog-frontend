import axios from 'axios';
import type {
  BlogDetailsResponse,
  BlogListResponse,
  PostedCommentResponse,
} from '../type/blog.types';
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

export const createComment = async (
  blogId: string,
  content: string,
  accessToken: string
): Promise<PostedCommentResponse> => {
  try {
    const response = await axios.post<PostedCommentResponse>(
      `${API_BASE}/blogs/${blogId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
