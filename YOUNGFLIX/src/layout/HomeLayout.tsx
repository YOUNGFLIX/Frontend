import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';

const HomeLayout = () => {
  const location = useLocation();
  const isMovieDetailPage = /^\/movie\/\d+/.test(location.pathname); // 예: /movie/123

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Outlet />
      {!isMovieDetailPage && <Footer />}
    </div>
  );
};

export default HomeLayout;