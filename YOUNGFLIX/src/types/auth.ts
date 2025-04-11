import { CommonResponse } from "./common.ts";

//회원가입
export type RequestSignupDto = {
  name: string;
  email: string;
  avatar?: string;
  nickname: string;
  password: string;
};

export type ResponseSingupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  nickname: string;
}>;

//로그인
export type RequestSigninDto = {
  email: string;
  password: string;
};

export type ResponseSigninDto = {
  accessToken: string;
  refreshToken: string;
};

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  nickname: string;
  avatar: string | null;
}>;

//이메일 체크
export type ResponseCheckEmail = CommonResponse<boolean>;