import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSingupDto, RequestVerifyCodeDto, ResponseVerifyCodeDto, RequestSendCodeDto } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSingupDto> => {
    const { data } = await axiosInstance.post("v1/member/signup",body);

    return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("v1/auth/login",body);

    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const { data } = await axiosInstance.get("v1/member/mypage/info", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return data;
};

export const putMyInfo = async (body: ResponseMyInfoDto): Promise<ResponseMyInfoDto> => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    const { data } = await axiosInstance.put("v1/member/mypage/info", body, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return data;
};

export const checkEmail = async (email: string): Promise<boolean> => {
    const { data } = await axiosInstance.get("v1/email/check-email", {
        params: { email }
    });

    return data.data;
};


export const verifyCode = async (body: RequestVerifyCodeDto): Promise<ResponseVerifyCodeDto> => {
    const { data } = await axiosInstance.post("v1/email/verify-code", body);
    return data.data;
  };
  

export const sendCode = async (body: RequestSendCodeDto): Promise<void> => {
    await axiosInstance.post("v1/email/send-code", body);
};