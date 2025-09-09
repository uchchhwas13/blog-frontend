import axios from 'axios';
import type {
  AddBlogPayload,
  BlogDetailsResponse,
  BlogListResponse,
  CreateBlogResponse,
  LikersResponse,
  PostedCommentResponse,
  ToggleLikeResponse,
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
    const response = await axiosInstance.get<BlogDetailsResponse>(
      `/blogs/${id}`
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
      `/blogs`,
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
      `/blogs/${blogId}/comments`,
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

export const updateComment = async (
  blogId: string,
  commentId: string,
  content: string
): Promise<PostedCommentResponse> => {
  try {
    const response = await axiosInstance.put<PostedCommentResponse>(
      `/blogs/${blogId}/comments/${commentId}`,
      { content }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
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
      `/blogs/${blogId}/likes`
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

export const toggleLike = async (
  blogId: string,
  isLiked: boolean
): Promise<ToggleLikeResponse> => {
  try {
    const response = await axiosInstance.post<ToggleLikeResponse>(
      `/blogs/${blogId}/likes`,
      { isLiked }
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
