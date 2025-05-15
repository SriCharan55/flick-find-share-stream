
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { MovieGrid } from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/contexts/MovieContext';
import { useAuth } from '@/contexts/AuthContext';
import { Movie } from '@/types';

const Watchlist = () => {
  const { movies } = useMovies();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    if (user) {
      // In a real app, we would fetch the user's watchlist from the API
      // For now, we'll just display some random movies
      setWatchlistMovies(movies.slice(0, 6));
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [user, navigate, movies]);
  
  if (!user) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Watchlist</h1>
        </div>
        
        {watchlistMovies.length > 0 ? (
          <MovieGrid movies={watchlistMovies} />
        ) : (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding movies to your watchlist to keep track of what you want to watch.
            </p>
            <Button onClick={() => navigate('/movies')}>
              Browse Movies
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Watchlist;
