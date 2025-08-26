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

export type Comment = {
  id: string;
  content: string;
  createdBy: {
    name: string;
    imageUrl: string;
  };
  createdAt: string;
};

export type BlogContent = {
  id: string;
  title: string;
  body: string;
  coverImageUrl: string;
  createdAt: string;
  createdBy: {
    name: string;
    imageUrl: string;
  };
};

export type BlogDetailsModel = {
  blog: BlogContent;
  comments: [Comment];
};

export type BlogDetailsResponse = ApiResponse<BlogDetailsModel>;
