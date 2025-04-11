import { JSX } from "react";

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg">유효하지 않은 페이지입니다. 주소를 다시 확인해주세요.</p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
