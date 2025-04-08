import React, { JSX, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { MovieResponse, Movie } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Homepage = (): JSX.Element => {
  const location = useLocation();
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const shuffled = data.results
          .filter((movie) => movie.backdrop_path)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12)
          .map((movie) => `${IMAGE_BASE_URL}${movie.backdrop_path}`);
        setBackgroundImages(shuffled);
      } catch (error) {
        console.error("배경 이미지 불러오기 실패:", error);
      }
    };

    if (location.pathname === "/") {
      fetchBackground();
    }
  }, [location.pathname]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      {location.pathname === "/" ? (
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
      ) : (
        <div className="min-h-screen text-white">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Homepage;