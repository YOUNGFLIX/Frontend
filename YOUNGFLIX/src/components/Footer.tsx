import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm mt-10 py-10 px-4 text-center border-t border-gray-800">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center gap-4">
        <nav className="flex flex-wrap justify-center gap-4 font-semibold text-sm">
        </nav>

        <div className="flex gap-6 mt-4 items-center justify-center">
          <a href="https://www.instagram.com/wonjunyyoung/" target="_blank" rel="noopener noreferrer">
            <img src="/images/insta2.webp" alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="https://github.com/geg222/" target="_blank" rel="noopener noreferrer">
            <img src="/images/git.png" alt="Instagram" className="w-8 h-8" />
          </a>
        </div>

        <div className="text-xs leading-5 text-gray-400 mt-4 text-center">
          YOUNGFLIX | 대표자: 원준영 | 서울특별시 성북구 삼선교로16길 116 (우편번호: 02876) | 
          Email: junyeongwon872@gmail.com | 연락처: 010-6275-1591 | 사업자등록번호: 227-14-427110 | 통신판매업 신고번호: 제2025-서울성북-12345호 |
          비디오물배급업 신고번호: 제2025-01호 | 콘텐츠산업진흥법에 따른 콘텐츠 제공서비스 사업자: YOUNGFLIX의 콘텐츠는 
          서비스 제공 조건에 따라 변경될 수 있습니다.
        </div>

        <div className="text-xs text-gray-500 mt-2">© 2025 YOUNGFLIX and its related entities. All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
