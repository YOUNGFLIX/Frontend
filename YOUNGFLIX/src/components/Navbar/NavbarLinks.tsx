import { NavLink } from 'react-router-dom';

const MAIN_LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '상영 중' },
  { to: '/movies/top_rated', label: '평점 순' },
  { to: '/movies/upcoming', label: '개봉 예정' },
];

const NavbarLinks = () => {
  return (
    <>
      {MAIN_LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? 'text-lg font-semibold text-red-600'
              : 'text-lg font-semibold text-white hover:text-red-500'
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  );
};

export default NavbarLinks;