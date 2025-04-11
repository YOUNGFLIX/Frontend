import React from 'react';

interface StepPasswordProps {
  password: string;
  passwordConfirm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    password?: string;
    passwordConfirm?: string;
  };
  onNext: () => void;
}

const StepPassword: React.FC<StepPasswordProps> = ({ password, passwordConfirm, onChange, errors, onNext }) => {
  const isDisabled = !password || !passwordConfirm || password !== passwordConfirm;

  return (
    <div className="flex flex-col gap-4">
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChange}
        className="bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

      <input
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={onChange}
        className="bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      {errors.passwordConfirm && <div className="text-red-500 text-sm">{errors.passwordConfirm}</div>}

      <button
        onClick={onNext}
        disabled={isDisabled}
        className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
          isDisabled ? 'bg-[#3e1313] text-white cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default StepPassword;
