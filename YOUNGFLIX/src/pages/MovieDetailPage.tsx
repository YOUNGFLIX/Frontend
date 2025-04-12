import React, { JSX } from 'react';
import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieDetail } from '../types/movie';
import IsError from '../components/IsError';
import MovieHeader from '../components/MovieHeader';
import MoviePeopleGrid from '../components/MoviePeopleGrid';
import MovieVideo from '../components/MovieVideo';
import MovieStreamingProviders from '../components/MovieStreamingProviders';

const MovieDetailPage = (): JSX.Element => {
  const { movieId } = useParams<{ movieId: string }>();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: movie, isPending, isError } = useCustomFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits,videos,watch/providers`
  );

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

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        영화 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (isError || !movie) {
    return <IsError/>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MovieHeader movie={movie} />
      {Array.isArray(movie.videos?.results) && movie.videos.results.length > 0 && (
        <MovieVideo videoKey={movie.videos.results[0].key} />
      )}
      {peopleToShow.length > 0 && <MoviePeopleGrid people={peopleToShow} />}
      {movie["watch/providers"]?.results?.KR?.flatrate && (
        <MovieStreamingProviders providers={movie["watch/providers"].results.KR.flatrate} />
      )}
    </div>
  );
};

export default MovieDetailPage;
