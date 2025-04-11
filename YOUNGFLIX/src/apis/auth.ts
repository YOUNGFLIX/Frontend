import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSingupDto } from "../types/auth"
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
    const { data } = await axiosInstance.get("v1/member/check-email", {
        params: { email }
    });

    return data.data;
};