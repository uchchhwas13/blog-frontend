export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

export type BlogModel = {
  id: string;
  title: string;
  coverImageUrl: string;
  createdAt: string;
};

type BlogListData = {
  blogs: BlogModel[];
};

export type BlogListResponse = ApiResponse<BlogListData>;
