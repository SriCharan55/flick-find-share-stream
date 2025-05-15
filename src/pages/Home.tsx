
import React from 'react';
import { Layout } from '@/components/Layout/Layout';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSlider } from '@/components/FeaturedSlider';
import { MovieGrid } from '@/components/MovieGrid';
import { useMovies } from '@/contexts/MovieContext';

const Home = () => {
  const { featuredMovies, movies } = useMovies();
  
  // Get a featured movie for the hero
  const heroMovie = featuredMovies.length > 0 ? featuredMovies[0] : null;
  
  // Group movies by genre
  const actionMovies = movies.filter(movie => movie.genres.includes('Action')).slice(0, 12);
  const comedyMovies = movies.filter(movie => movie.genres.includes('Comedy')).slice(0, 12);
  const sciFiMovies = movies.filter(movie => movie.genres.includes('Sci-Fi')).slice(0, 12);
  
  return (
    <Layout>
      {heroMovie && <HeroSection movie={heroMovie} />}
      
      <FeaturedSlider title="Featured Movies" movies={featuredMovies} />
      
      <div className="container px-4">
        <MovieGrid title="Action Movies" movies={actionMovies} />
        <MovieGrid title="Comedy Movies" movies={comedyMovies} />
        <MovieGrid title="Science Fiction" movies={sciFiMovies} />
      </div>
    </Layout>
  );
};

export default Home;
