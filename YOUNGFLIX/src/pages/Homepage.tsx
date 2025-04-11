import React, { JSX } from "react";
import { useLocation } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieResponse } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Homepage = (): JSX.Element => {
  const location = useLocation();
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );

  const backgroundImages = (data?.results || [])
    .filter((movie) => movie.backdrop_path)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12)
    .map((movie) => `${IMAGE_BASE_URL}${movie.backdrop_path}`);

  return (
    location.pathname === "/" && (
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 blur-sm brightness-50 z-0">
          {backgroundImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="배경 이미지"
              className="w-full h-full object-cover"
            />
          ))}
        </div>
        <div className="flex justify-center items-center h-screen z-10 relative">
          <h1 className="text-[12rem] font-extrabold text-red-600 tracking-wider drop-shadow-2xl zoom-fade">YOUNGFLIX</h1>
        </div>
      </div>
    )
  );
};

export default Homepage;