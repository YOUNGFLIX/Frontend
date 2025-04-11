import React from 'react';

interface MovieTrailerProps {
  videoKey: string;
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({ videoKey }) => {
  if (!videoKey) return null;

  return (
    <div className="px-4 md:px-20 mt-8">
      <h2 className="text-3xl font-bold mb-6">예고편</h2>
      <div className="w-full max-w-6xl mx-auto aspect-video rounded overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          title="예고편"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default MovieTrailer;
