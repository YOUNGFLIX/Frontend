import { NavLink } from 'react-router-dom';

const AUTH_LINKS = [
  { to: '/login', label: '로그인' },
  { to: '/signup', label: '회원가입' }
];

const NavbarAuth = () => {
  return (
    <>
      {AUTH_LINKS.map(({ to, label }, index) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `px-3 py-1 rounded ${
              index === 0
                ? 'bg-black text-white borde hover:bg-white hover:text-black'
                : 'bg-red-600 text-white hover:bg-red-500'
            } text-sm font-semibold transition-colors duration-200`
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
};

export default NavbarAuth;
