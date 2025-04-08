import { NavLink } from 'react-router-dom'

const MAIN_LINKS = [
    { to: '/', label: '홈' },
    { to: '/movies/popular', label: '인기 영화' },
    { to: '/movies/now_playing', label: '상영 중' },
    { to: '/movies/top_rated', label: '평점 순' },
    { to: '/movies/upcoming', label: '개봉 예정' },
];

const AUTH_LINKS = [
    { to: '/login', label: '로그인' },
    { to: '/signup', label: '회원가입' }
];

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-6">
        <h1 className="text-[1rem] font-extrabold items-center text-red-600 tracking-wider drop-shadow">YOUNGFLIX</h1>
        {MAIN_LINKS.map(({to, label}) => (
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
      </div>
      <div className="flex gap-2">
        {AUTH_LINKS.map(({to, label}, index) => (
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
      </div>
    </div>
  )
}

export default Navbar
