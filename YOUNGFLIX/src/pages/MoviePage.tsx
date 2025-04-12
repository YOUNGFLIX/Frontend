import { JSX, useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import IsError from "../components/IsError";
import MovieHero from "../components/MovieHero";

export default function MoviePage(): JSX.Element {
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category: string;
  }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
  }, [category]);
  
  const categoryMap = {
    popular: "인기 영화",
    top_rated: "평점 높은 영화",
    now_playing: "상영 중인 영화",
    upcoming: "개봉 예정 영화"
  };

  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);

  if (isError) {
    return <IsError/>
  }

  return (
    <div className="bg-black p-10">
      {data?.results?.[0] && <MovieHero movie={data.results[0]} />}

      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-wide">
        {{
          popular: "인기 영화",
          top_rated: "평점 높은 영화",
          now_playing: "상영 중인 영화",
          upcoming: "개봉 예정 영화"
        }[category as keyof typeof categoryMap] || "영화 목록"}
      </h2>

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && data && (
        <>
          <div className="p-10 grid gap-4 grid-cols-7 mx-auto">
            {data.results.map((movie): JSX.Element => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

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
        </>
      )}
    </div>
  );
}
