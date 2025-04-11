import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface StepEmailProps {
  register: UseFormRegisterReturn;
  email: string;
  error?: string;
  handleNextStep: () => void;
}

const StepEmail: React.FC<StepEmailProps> = ({
  register,
  email,
  error,
  handleNextStep,
}) => {
  return (
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
        {...register}
        className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border ${
          error ? 'border-red-500' : 'border-[#555]'
        }`}
        type="email"
        placeholder="이메일"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="button"
        onClick={handleNextStep}
        className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
          email && !error
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-[#3e1313] text-white cursor-not-allowed'
        }`}
      >
        다음
      </button>
    </>
  );
};

export default StepEmail;
