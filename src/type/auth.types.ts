import type { ApiResponse } from './type';

export type SignUpFormDataType = {
  fullname: string;
  email: string;
  password: string;
  profileImage: File | null;
};

export type SignInFormDataType = {
  email: string;
  password: string;
};

type UserData = {
  id: string;
  email: string;
  name: string;
};

export type SignInSuccessResponse = {
  user: UserData;
  accessToken: string;
  refreshToken: string;
};

export type SignInResponse = ApiResponse<SignInSuccessResponse>;
