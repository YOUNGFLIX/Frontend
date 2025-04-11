import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const NavbarDropdown = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const avatarUrl = localStorage.getItem('avatarUrl');
  const profileImage = avatarUrl || 'https://www.gravatar.com/avatar/?d=mp';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-8 h-8 rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://www.gravatar.com/avatar/?d=mp';
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#111] text-white rounded shadow-lg py-2 z-20">
          <div
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate('/mypage')}
          >
            프로필 관리
          </div>
          <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">계정</div>
          <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">고객 센터</div>
          <div
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-400"
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('avatarUrl');
              window.location.reload();
            }}
          >
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
