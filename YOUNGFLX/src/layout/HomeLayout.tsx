import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      {/* <div className={location.pathname === '/' ? '' : 'pt-4'}> */}
        <Outlet />
      </div>
    // </div>
  );
};

export default HomeLayout;
