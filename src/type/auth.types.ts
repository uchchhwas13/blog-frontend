import type { ApiResponse } from './type';

export type SignUpPayload = {
  fullname: string;
  email: string;
  password: string;
  profileImage: File | null;
};

export type SignInPayload = {
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

export type RefreshTokenSuccessResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SignUpResponse = ApiResponse<UserData>;
export type SignInResponse = ApiResponse<SignInSuccessResponse>;
export type LogoutResponse = ApiResponse<void>;

export type RefreshTokenResponse = ApiResponse<RefreshTokenSuccessResponse>;
