import React from "react";

const IsError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-600 bg-red-50 px-6 py-12 rounded-lg shadow-lg mx-4 text-center">
      <h2 className="text-3xl font-bold mb-4">에러가 발생했습니다</h2>
      <p className="text-lg">잠시 후 다시 시도해주세요.</p>
    </div>
  );
};

export default IsError;
