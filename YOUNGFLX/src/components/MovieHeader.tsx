import React, { JSX } from 'react';
import { MovieDetail } from '../types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

interface MovieHeaderProps {
  movie: MovieDetail;
}

const MovieHeader = ({ movie }: MovieHeaderProps): JSX.Element => {
  return (
    <div className="relative w-full h-[600px]">
      <img
        src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black opacity-80 z-10" />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-10 z-20">
        <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">{movie.title}</h1>
        <div className="flex gap-4 mb-4 text-sm font-semibold text-gray-300">
          <span className="bg-white/10 px-3 py-1 rounded">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="bg-white/10 px-3 py-1 rounded">{new Date(movie.release_date).getFullYear()}년</span>
          <span className="bg-white/10 px-3 py-1 rounded">⏱ {movie.runtime}분</span>
        </div>
        <p className="text-2xl italic text-gray-300 mb-4">{movie.tagline}</p>
        <p className="text-base text-gray-200 max-w-2xl leading-relaxed">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieHeader;
