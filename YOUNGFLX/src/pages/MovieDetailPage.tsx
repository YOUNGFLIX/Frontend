import React, { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MovieDetail } from '../types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MovieDetailPage = (): JSX.Element => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setMovie(data);
      } catch (error) {
        console.error('영화 정보를 불러오는 중 오류 발생:', error);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  const getCastAndCrew = (movie: any) => {
    const cast = movie?.credits?.cast || [];
    const crew = movie?.credits?.crew || [];

    const directors = crew.filter((person: any) => person.job === "Director");
    const combined = [...directors, ...cast];
    const uniquePeople = combined.reduce((acc: any[], current: any) => {
      const exists = acc.find((p) => p.id === current.id);
      if (!exists) acc.push(current);
      return acc;
    }, []);
    return uniquePeople;
  };

  const peopleToShow = getCastAndCrew(movie).slice(0, 20);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        영화 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
      {peopleToShow.length > 0 && (
        <div className="bg-black text-white px-10 py-6">
          <h2 className="text-3xl font-bold mb-6">감독/출연</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-6">
            {peopleToShow.map((person) => (
              <div key={person.id} className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : 'https://via.placeholder.com/150x225?text=No+Image'
                  }
                  alt={person.name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-lg"
                />
                <p className="mt-2 text-sm font-semibold">{person.name}</p>
                <p className="text-xs text-gray-400">{person.character || person.job}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
