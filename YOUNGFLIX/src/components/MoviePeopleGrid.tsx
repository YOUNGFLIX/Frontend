import React from 'react';
import { MovieCast } from '../types/movie';

interface Props {
  people: MovieCast[];
}

const MoviePeopleGrid = ({ people }: Props) => {
  return (
    <div className="bg-black text-white px-10 py-6">
      <h2 className="text-3xl font-bold mb-6">감독/출연</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-6">
        {people.map((person) => (
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
  );
};

export default MoviePeopleGrid;