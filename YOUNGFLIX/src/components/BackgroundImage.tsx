import React, { useMemo } from "react";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieResponse } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const BackGroundImage: React.FC = () => {
  const { data } = useCustomFetch<MovieResponse>(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );

  const backgroundImage = useMemo(() => {
    return (
      (data?.results || [])
        .filter((movie) => movie.backdrop_path)
        .sort(() => Math.random() - 0.5)
        .slice(0, 1)
        .map((movie) => `${IMAGE_BASE_URL}${movie.backdrop_path}`)[0] || ""
    );
  }, [data]);

  return (
    <>
      {backgroundImage && (
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-50 z-0"
        />
      )}
    </>
  );
};

export default BackGroundImage;
