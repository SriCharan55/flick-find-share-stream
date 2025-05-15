
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSlider } from '@/components/FeaturedSlider';
import { MovieGrid } from '@/components/MovieGrid';
import { useMovies } from '@/contexts/MovieContext';
import { FilterBar } from '@/components/Filters/FilterBar';
import { Movie } from '@/types';

const Home = () => {
  const { featuredMovies, movies } = useMovies();
  
  // State for filtered movies
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [visibleFilters, setVisibleFilters] = useState(false);
  
  // Get a featured movie for the hero
  const heroMovie = featuredMovies.length > 0 ? featuredMovies[0] : null;
  
  // Initialize movies when component mounts
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);
  
  const handleFilterChange = (filters: { genres: string[]; year?: number; rating?: number }) => {
    // Filter logic
    const filtered = movies.filter(movie => {
      const genreMatch = !filters.genres?.length || movie.genres.some(g => filters.genres.includes(g));
      const yearMatch = !filters.year || movie.releaseYear === filters.year;
      const ratingMatch = !filters.rating || movie.rating >= filters.rating;
      return genreMatch && yearMatch && ratingMatch;
    });
    
    setFilteredMovies(filtered);
  };
  
  // Create genre-specific collections from filtered movies
  const actionMovies = filteredMovies.filter(movie => movie.genres.includes('Action')).slice(0, 12);
  const comedyMovies = filteredMovies.filter(movie => movie.genres.includes('Comedy')).slice(0, 12);
  const sciFiMovies = filteredMovies.filter(movie => movie.genres.includes('Sci-Fi')).slice(0, 12);
  const adventureMovies = filteredMovies.filter(movie => movie.genres.includes('Adventure')).slice(0, 12);
  const dramaMovies = filteredMovies.filter(movie => movie.genres.includes('Drama')).slice(0, 12);
  
  return (
    <Layout>
      {heroMovie && <HeroSection movie={heroMovie} />}
      
      <FeaturedSlider title="Featured Movies" movies={featuredMovies} />
      
      <div className="container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Movie Collection</h2>
          <button 
            onClick={() => setVisibleFilters(!visibleFilters)} 
            className="flex items-center gap-2 text-sm font-medium hover:underline"
          >
            {visibleFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {visibleFilters && (
          <div className="mb-8">
            <FilterBar 
              onFilterChange={handleFilterChange}
              totalResults={filteredMovies.length}
            />
          </div>
        )}
        
        <div className="space-y-12">
          <MovieGrid title="Action Movies" movies={actionMovies} />
          <MovieGrid title="Comedy Movies" movies={comedyMovies} />
          <MovieGrid title="Science Fiction" movies={sciFiMovies} />
          <MovieGrid title="Adventure Movies" movies={adventureMovies} />
          <MovieGrid title="Drama" movies={dramaMovies} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
