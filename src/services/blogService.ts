import axios from 'axios';
import type {
  AddBlogPayload,
  BlogDetailsResponse,
  BlogListResponse,
  CreateBlogResponse,
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
      payload
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
