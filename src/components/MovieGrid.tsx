
import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '@/types';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, title }) => {
  if (!movies.length) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-2xl font-semibold">No movies found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <section className="section-padding">
      {title && (
        <h2 className="category-title mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="flex">
            <MovieCard key={movie.id} movie={movie} className="w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};
