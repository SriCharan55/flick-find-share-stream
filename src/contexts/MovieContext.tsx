
import React, { createContext, useContext, useState } from 'react';
import { Movie, MoviesResponse, StreamingService } from '@/types';
import { useToast } from '@/components/ui/use-toast';

type MovieContextType = {
  movies: Movie[];
  featuredMovies: Movie[];
  isLoading: boolean;
  error: string | null;
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
  searchMovies: (query: string) => Promise<Movie[]>;
  getMovieById: (id: string) => Movie | undefined;
  getRecommendations: (movieId: string) => Movie[];
  filterMovies: (genres?: string[], year?: number, rating?: number) => Movie[];
  checkStreamingAvailability: (movieId: string) => StreamingService[];
};

// Mock data - in a real app this would come from an API
import { mockMovies } from '@/data/mockMovies';

const MovieContext = createContext<MovieContextType>({
  movies: [],
  featuredMovies: [],
  isLoading: false,
  error: null,
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  searchMovies: async () => [],
  getMovieById: () => undefined,
  getRecommendations: () => [],
  filterMovies: () => [],
  checkStreamingAvailability: () => [],
});

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Select 5 random movies for the featured section
  const featuredMovies = React.useMemo(() => {
    return [...mockMovies]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, []);

  const addToWatchlist = (movieId: string) => {
    // In a real app, we would call an API
    toast({
      title: "Added to watchlist",
      description: "Movie has been added to your watchlist",
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    // In a real app, we would call an API
    toast({
      title: "Removed from watchlist",
      description: "Movie has been removed from your watchlist",
    });
  };

  const searchMovies = async (query: string): Promise<Movie[]> => {
    setIsLoading(true);
    try {
      // In a real app, we would call an API
      const results = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
      );
      setIsLoading(false);
      return results;
    } catch (err) {
      setError('Failed to search movies');
      setIsLoading(false);
      return [];
    }
  };

  const getMovieById = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  const getRecommendations = (movieId: string): Movie[] => {
    const movie = getMovieById(movieId);
    if (!movie) return [];
    
    // Simple recommendation: movies from the same genre
    return movies
      .filter(m => m.id !== movieId && 
        m.genres.some(genre => movie.genres.includes(genre)))
      .slice(0, 6);
  };

  const filterMovies = (genres?: string[], year?: number, rating?: number): Movie[] => {
    return movies.filter(movie => {
      const genreMatch = !genres?.length || movie.genres.some(g => genres.includes(g));
      const yearMatch = !year || movie.releaseYear === year;
      const ratingMatch = !rating || movie.rating >= rating;
      return genreMatch && yearMatch && ratingMatch;
    });
  };

  const checkStreamingAvailability = (movieId: string): StreamingService[] => {
    // Mock implementation - in a real app this would call an API
    const movie = getMovieById(movieId);
    if (!movie) return [];
    return movie.streamingOn || [];
  };

  return (
    <MovieContext.Provider 
      value={{ 
        movies, 
        featuredMovies, 
        isLoading, 
        error, 
        addToWatchlist, 
        removeFromWatchlist, 
        searchMovies, 
        getMovieById,
        getRecommendations,
        filterMovies,
        checkStreamingAvailability
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
