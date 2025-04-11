import React from 'react';
import { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

interface MovieHeroProps {
  movie: Movie;
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

  return (
    <div className="relative w-full h-[70vh] bg-black text-white mb-10 overflow-hidden">
      {movie.backdrop_path && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
          style={{ backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})` }}
        />
      )}
      <Link
        to={`/movie/${movie.id}`}
        className="relative z-10 flex flex-col justify-center items-start h-full px-10 hover:opacity-90 transition-opacity duration-200"
      >
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">{movie.title}</h1>
        <p className="text-lg max-w-xl line-clamp-3 drop-shadow-sm">{movie.overview}</p>
      </Link>
    </div>
  );
};

export default MovieHero;