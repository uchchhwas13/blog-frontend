import type { ApiResponse } from './type';

export type BlogModel = {
  id: string;
  title: string;
  coverImageUrl: string;
  createdAt: string;
};

type PaginationModel = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type BlogListData = {
  blogs: BlogModel[];
  pagination: PaginationModel;
};

export type BlogListResponse = ApiResponse<BlogListData>;

export type Comment = {
  id: string;
  content: string;
  createdBy: {
    name: string;
    imageUrl: string;
    id: string;
  };
  createdAt: string;
};

export type BlogContent = {
  id: string;
  title: string;
  body: string;
  coverImageUrl: string;
  createdAt: string;
  isLikedByUser: boolean;
  totalLikes: number;
  createdBy: {
    name: string;
    imageUrl: string;
  };
};

export type BlogDetailsModel = {
  blog: BlogContent;
  comments: Comment[];
};

export type BlogDetailsResponse = ApiResponse<BlogDetailsModel>;

type CommentResponse = {
  comment: Comment;
};
export type PostedCommentResponse = ApiResponse<CommentResponse>;

export type AddBlogPayload = {
  title: string;
  body: string;
  coverImage: File;
};

export type AddBlogResponse = {
  blog: {
    id: string;
    title: string;
    body: string;
    coverImageUrl: string;
    createdAt: string;
    createdBy: {
      name: string;
      id: string;
    };
  };
};

export type CreateBlogResponse = ApiResponse<AddBlogResponse>;

export type Liker = {
  id: string;
  name: string;
  imageUrl: string;
};

type LikersSuccessResponse = {
  success: boolean;
  users: Liker[];
};

export type LikersResponse = ApiResponse<LikersSuccessResponse>;

export type ToggleLikeResponse = ApiResponse<{ isLiked: boolean }>;
