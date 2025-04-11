import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import NavbarDropdown from './NavbarDropdown';
import NavbarLinks from './NavbarLinks';
import NavbarAuth from './NavbarAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const avatarUrl = localStorage.getItem('avatar');
  const profileImage = avatarUrl || 'https://www.gravatar.com/avatar/?d=mp';
  
  return (
    <div className="flex justify-between items-center p-4 ml-4">
      <div className="flex items-center gap-6">
        <h1 className="text-[1rem] font-extrabold items-center text-red-600 tracking-wider drop-shadow">YOUNGFLIX</h1>
        <NavbarLinks />
      </div>
      <div className="flex gap-2 items-center">
        {accessToken ? (
          <NavbarDropdown avatar={profileImage} />
        ) : (
          <NavbarAuth />
        )}
      </div>
    </div>
  )
}

export default Navbar
