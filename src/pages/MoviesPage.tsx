
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
  
  // Initialize with all movies when component mounts
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <FilterBar 
          onFilterChange={handleFilterChange}
          totalResults={filteredMovies.length}
        />
        
        <div className="mt-8">
          <MovieGrid movies={filteredMovies} />
        </div>
      </div>
    </Layout>
  );
};

export default MoviesPage;
