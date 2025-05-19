
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
  
  // Get at least 6 unique movies per category to avoid empty space
  const getUniqueMoviesByGenre = (genre: string): Movie[] => {
    // Get movies with the specified genre, sorted by rating
    let genreMovies = filteredMovies
      .filter(movie => movie.genres.includes(genre))
      .sort((a, b) => b.rating - a.rating);
    
    // If we don't have enough movies for this genre, add some from all movies
    if (genreMovies.length < 6) {
      const otherMovies = movies
        .filter(movie => !genreMovies.some(gm => gm.id === movie.id))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6 - genreMovies.length);
      
      genreMovies = [...genreMovies, ...otherMovies];
    }

    return genreMovies.slice(0, 8); // Return at least 6, up to 8 movies
  };
  
  const actionMovies = getUniqueMoviesByGenre('Action');
  const comedyMovies = getUniqueMoviesByGenre('Comedy');
  const sciFiMovies = getUniqueMoviesByGenre('Sci-Fi');
  const adventureMovies = getUniqueMoviesByGenre('Adventure');
  const dramaMovies = getUniqueMoviesByGenre('Drama');
  const thrillerMovies = getUniqueMoviesByGenre('Thriller');
  const crimeMovies = getUniqueMoviesByGenre('Crime');
  const animationMovies = getUniqueMoviesByGenre('Animation');
  
  return (
    <Layout>
      {heroMovie && <HeroSection movie={heroMovie} />}
      
      <div className="container mx-auto px-4 py-6">
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
      </div>
      
      <FeaturedSlider title="Featured Movies" movies={featuredMovies} />
      
      <div className="space-y-8">
        {actionMovies.length > 5 && <FeaturedSlider title="Action Movies" movies={actionMovies} />}
        {comedyMovies.length > 5 && <FeaturedSlider title="Comedy Movies" movies={comedyMovies} />}
        {dramaMovies.length > 5 && <FeaturedSlider title="Drama" movies={dramaMovies} />}
        {adventureMovies.length > 5 && <FeaturedSlider title="Adventure Movies" movies={adventureMovies} />}
        {sciFiMovies.length > 5 && <FeaturedSlider title="Science Fiction" movies={sciFiMovies} />}
        {thrillerMovies.length > 5 && <FeaturedSlider title="Thriller Movies" movies={thrillerMovies} />}
        {crimeMovies.length > 5 && <FeaturedSlider title="Crime Movies" movies={crimeMovies} />}
        {animationMovies.length > 5 && <FeaturedSlider title="Animation Movies" movies={animationMovies} />}
      </div>
    </Layout>
  );
};

export default Home;
