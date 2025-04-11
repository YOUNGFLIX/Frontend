import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useCallback } from "react";
import useCustomFetch from "../hooks/useCustomFetch";
import { postSignup as apiPostSignup } from "../apis/auth";
import { MovieResponse } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export const SignupPage = () => {
  const navigate = useNavigate();
  const { data } = useCustomFetch<MovieResponse>(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );

  const backgroundImage = useMemo(() => {
    return (
      (data?.results || [])
        .filter((movie) => movie.backdrop_path)
        .sort(() => Math.random() - 0.5)
        .slice(0, 1)
        .map((movie) => `${IMAGE_BASE_URL}${movie.backdrop_path}`)[0] || ""
    );
  }, [data]);

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");
  const nickname = watch("nickname");

  const handleNextStep = async () => {
    const valid = await trigger(
      step === 1
        ? "email"
        : step === 2
        ? ["password", "passwordCheck"]
        : step === 3
        ? ["name", "nickname"]
        : "nickname"
    );
    if (valid && (step !== 2 || password === passwordCheck)) {
      setStep(step + 1);
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    const response = await apiPostSignup(rest);
    console.log(response);
    navigate("/login");
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step === 1 && email && !errors.email) {
          handleNextStep();
        } else if (
          step === 2 &&
          password &&
          passwordCheck &&
          !errors.password &&
          !errors.passwordCheck &&
          password === passwordCheck
        ) {
          handleNextStep();
        } else if (
          step === 3 &&
          name &&
          nickname &&
          !errors.name &&
          !errors.nickname
        ) {
          handleNextStep();
        }
      }
    },
    [step, email, password, passwordCheck, name, nickname, errors]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {backgroundImage && (
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-50 z-0"
        />
      )}
      <div className="absolute inset-0 z-10 flex items-start justify-center pt-30">
        <div className="bg-black bg-opacity-80 p-10 rounded-md shadow-md w-full max-w-md flex flex-col gap-4 text-white">
          <div className="relative text-white mb-2">
            <button
              onClick={() => setStep(step > 1 ? step - 1 : 1)}
              className="absolute left-0 text-white text-2xl px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-20"
              aria-label="이전 단계로"
            >
              ←
            </button>
            <div className="text-center items-center text-3xl font-extrabold text-white tracking-wider drop-shadow">
              회원가입
            </div>
          </div>

          {step === 1 && (
            <>
              <button className="w-full py-2 border border-white rounded text-white hover:bg-white hover:text-black transition duration-200 px-4 flex items-center justify-center gap-2">
                <img src="images/google.png" alt="Google logo" className="w-5 h-5" />
                <span className="font-medium">구글 로그인</span>
              </button>

              <div className="flex items-center gap-4 my-4">
                <div className="flex-grow h-px bg-gray-600" />
                <span className="text-gray-400 text-sm">또는</span>
                <div className="flex-grow h-px bg-gray-600" />
              </div>

              <input
                {...register("email")}
                className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border ${
                  errors?.email ? "border-red-500" : "border-[#555]"
                }`}
                type="email"
                placeholder="이메일"
              />
              {errors?.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
                  email && !errors.email
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#3e1313] text-white cursor-not-allowed"
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-sm font-semibold text-gray-300 tracking-wide">{email}</div>

              <div className="relative w-full">
                <input
                  {...register("password")}
                  className={`bg-[#333] w-full p-3 pr-10 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    errors?.password ? "border-red-500" : "border-[#555]"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  👁️
                </button>
                {errors?.password && (
                  <div className="text-red-500 text-sm">{errors.password.message}</div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  {...register("passwordCheck")}
                  className={`bg-[#333] w-full p-3 pr-10 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    errors?.passwordCheck ? "border-red-500" : "border-[#555]"
                  }`}
                  type={showPasswordCheck ? "text" : "password"}
                  placeholder="비밀번호 확인"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  👁️
                </button>
                {errors?.passwordCheck && (
                  <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
                )}
                {!errors?.passwordCheck && password !== passwordCheck && (
                  <div className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</div>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
                  password &&
                  passwordCheck &&
                  !errors.password &&
                  !errors.passwordCheck &&
                  password === passwordCheck
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#3e1313] text-white cursor-not-allowed"
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {errors?.name && (
                <div className="text-red-500 text-sm">{errors.name.message}</div>
              )}

              <div className="flex flex-col items-center gap-2 mb-6">
                <label htmlFor="profileImage" className="cursor-pointer">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 relative">
                    <img
                      src={previewUrl || "https://www.gravatar.com/avatar/?d=mp"}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setPreviewUrl(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </div>
              <input
                {...register("name")}
                className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                  errors?.name ? "border-red-500" : "border-[#555]"
                }`}
                type="text"
                placeholder="이름"
              />
              
              <input
                {...register("nickname")}
                className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                  errors?.nickname ? "border-red-500" : "border-[#555]"
                }`}
                type="text"
                placeholder="닉네임"
              />
              {errors?.nickname && (
                <div className="text-red-500 text-sm">{errors.nickname.message}</div>
              )}

              <button
                type="submit"
                className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
                  nickname
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#3e1313] text-white cursor-not-allowed"
                }`}
              >
                회원가입 완료
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;