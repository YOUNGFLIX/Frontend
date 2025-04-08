import React, { useState, useMemo, useEffect } from 'react';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import useForm from '../hooks/useForm'; 
import { useNavigate } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieResponse } from '../types/movie';

const LoginPage = () => {
    const navigate = useNavigate();
    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
    const { data } = useCustomFetch<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    );

    const backgroundImages = useMemo(() => {
        return (data?.results || [])
            .filter((movie) => movie.backdrop_path)
            .sort(() => Math.random() - 0.5)
            .slice(0, 1)
            .map((movie) => `${IMAGE_BASE_URL}${movie.backdrop_path}`);
    }, [data]);

    const handleSubmit = () => {
        console.log(values);
    };


    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) || Object.values(values).some((value) => value === "");

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Enter' && !isDisabled) {
              handleSubmit();
          }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, [handleSubmit, isDisabled]);
  

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <div
                className="absolute inset-0 bg-cover bg-center blur-sm brightness-50 z-0"
                style={{ backgroundImage: `url(${backgroundImages[0] || ''})` }}
            />
            <div className="flex items-start justify-center w-full h-full pt-30 relative z-10">
                <div className="bg-black bg-opacity-80 p-10 rounded-md shadow-md w-full max-w-md flex flex-col gap-4 text-white">
                    <div className="relative flex items-center justify-center mb-4">
                        <button
                            className="absolute left-0 text-white text-2xl"
                            onClick={() => navigate(-1)}
                        >
                            &lt;
                        </button>
                        <h2 className="text-3xl font-bold text-white text-center">로그인</h2>
                    </div>
    
                    <button className="w-full py-2 border border-white rounded text-white hover:bg-white hover:text-black transition duration-200 px-4 flex items-center justify-center gap-2">
                        <img
                            src="/src/images/google.png"
                            alt="Google logo"
                            className="w-5 h-5 justify-start"
                        />
                        <span className="font-medium">구글 로그인</span>
                    </button>

                    <div className="flex items-center gap-4 my-4">
                        <div className="flex-grow h-px bg-gray-600" />
                        <span className="text-gray-400 text-sm">또는</span>
                        <div className="flex-grow h-px bg-gray-600" />
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-4">
                        <input 
                            {...getInputProps('email')}
                            name='email'
                            className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                errors?.email && touched?.email ? 'border-red-50' : 'border-[#555]'
                            }`}
                            type="email"
                            placeholder="이메일"
                        />
                        {errors?.email && touched?.email && (
                            <div className="text-red-500 text-sm">{errors.email}</div>
                        )}

                        <input 
                            {...getInputProps('password')}
                            name='password'
                            className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
                                errors?.password && touched?.password ? 'border-red-500' : 'border-[#555]'
                            }`}
                            type="password"
                            placeholder="비밀번호"
                        />
                        {errors?.password && touched?.password && (
                            <div className="text-red-500 text-sm">{errors.password}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isDisabled}
                            className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
                                isDisabled ? 'bg-[#3e1313] text-white cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            로그인
                        </button>
                    </form>
                    <div className="text-sm text-center text-gray-400 mt-4">
                        아직 계정이 없으신가요?{" "}
                        <button onClick={() => navigate("/signup")} className="text-red-500 hover:underline">
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
