import { JSX } from "react";

export const LoadingSpinner = (): JSX.Element => {
  return (
    <div
      className="size-12 animate-spin rounded-full border-6
    border-t-transparent border-[#ba2929] role=status"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
};
