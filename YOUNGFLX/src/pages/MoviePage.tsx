import { JSX, useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams, Link } from "react-router-dom";

export default function MoviePage(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category: string;
  }>();
  
  const categoryMap = {
    popular: "인기 영화",
    top_rated: "평점 높은 영화",
    now_playing: "상영 중인 영화",
    upcoming: "개봉 예정 영화"
  };

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
        setIsPending(false);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600 bg-red-50 px-6 py-12 rounded-lg shadow-lg mx-4 text-center">
        <h2 className="text-3xl font-bold mb-4">에러가 발생했습니다</h2>
        <p className="text-lg">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="bg-black p-10">
      <div className="relative w-full h-[70vh] bg-black text-white mb-10 overflow-hidden">
        {movies[0] && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})` }}
          />
        )}
        <Link
          to={`/movie/${movies[0]?.id}`}
          className="relative z-10 flex flex-col justify-center items-start h-full px-10 hover:opacity-90 transition-opacity duration-200"
        >
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">{movies[0]?.title}</h1>
          <p className="text-lg max-w-xl line-clamp-3 drop-shadow-sm">{movies[0]?.overview}</p>
        </Link>
      </div>

      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-wide">
        {{
          popular: "인기 영화",
          top_rated: "평점 높은 영화",
          now_playing: "상영 중인 영화",
          upcoming: "개봉 예정 영화"
        }[category as keyof typeof categoryMap] || "영화 목록"}
      </h2>

      <div className="flex items-center justify-center gap-4 my-6 bg-black text-white">
        <button
          disabled={page === 1}
          onClick={(): void => setPage((prev): number => prev - 1)}
          className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 disabled:bg-gray-700 cursor-pointer disabled:cursor-not-allowed text-white"
        >
          {"<"}
        </button>
        <span className="text- font-semibold">{page} 페이지</span>
        <button
          onClick={(): void => setPage((prev): number => prev + 1)}
          className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 cursor-pointer text-white"
        >
          {">"}
        </button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map(
            (movie): JSX.Element => (
              <MovieCard key={movie.id} movie={movie} />
            )
          )}
        </div>
      )}
    </div>
  );
}
