import axios from 'axios';
import type {
  AddBlogPayload,
  BlogDetailsResponse,
  BlogListResponse,
  CreateBlogResponse,
  LikersResponse,
  PostedCommentResponse,
} from '../type/blog.types';
import { extractError, extractMessage } from '../utils/extractErrorMessage';
import { API_BASE } from './constants';
import { axiosInstance } from './api';

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

export const createBlog = async (
  payload: AddBlogPayload
): Promise<CreateBlogResponse> => {
  try {
    const response = await axiosInstance.post<CreateBlogResponse>(
      `${API_BASE}/blogs`,
      payload,
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

export const createComment = async (
  blogId: string,
  content: string
): Promise<PostedCommentResponse> => {
  try {
    const response = await axiosInstance.post<PostedCommentResponse>(
      `${API_BASE}/blogs/${blogId}/comments`,
      { content }
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

export const fetchLikers = async (blogId: string): Promise<LikersResponse> => {
  try {
    const response = await axiosInstance.get<LikersResponse>(
      `${API_BASE}/blogs/${blogId}/likes`
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
