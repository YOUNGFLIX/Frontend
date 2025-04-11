import React from "react";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 text-white text-2xl px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-20"
      aria-label="이전 단계로"
    >
      ←
    </button>
  );
};

export default BackButton;
