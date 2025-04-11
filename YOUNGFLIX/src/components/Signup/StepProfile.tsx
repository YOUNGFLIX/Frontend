import React, { useState } from "react";

const StepProfile = ({ handleSubmit, onSubmit, register, errors, nickname, previewUrl, setPreviewUrl }) => {
  if (!previewUrl) return null;

  return (
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
  );
};

export default StepProfile;
