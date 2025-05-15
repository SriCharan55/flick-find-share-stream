
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { MovieGrid } from '@/components/MovieGrid';
import { FilterBar } from '@/components/Filters/FilterBar';
import { useMovies } from '@/contexts/MovieContext';
import { Movie } from '@/types';

const MoviesPage = () => {
  const { movies, filterMovies } = useMovies();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  
  const handleFilterChange = (filters: { genres: string[]; year?: number; rating?: number }) => {
    const filtered = filterMovies(filters.genres, filters.year, filters.rating);
    setFilteredMovies(filtered);
  };
  
  return (
    <Layout>
      <FilterBar 
        onFilterChange={handleFilterChange}
        totalResults={filteredMovies.length}
      />
      
      <div className="container px-4 py-8">
        <MovieGrid movies={filteredMovies} />
      </div>
    </Layout>
  );
};

export default MoviesPage;
