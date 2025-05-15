
export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl?: string;
  rating: number;
  releaseYear: number;
  genres: string[];
  duration: number; // in minutes
  director: string;
  cast: string[];
  trailerUrl?: string;
  streamingOn?: StreamingService[];
  reviews?: Review[];
}

export interface MoviesResponse {
  results: Movie[];
  total: number;
  page: number;
  totalPages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  watchlist: string[]; // array of movie IDs
  preferences: {
    favoriteGenres: string[];
    recentlyViewed: string[]; // array of movie IDs
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type StreamingService = 'netflix' | 'prime';

export interface FilterOptions {
  genres?: string[];
  releaseYear?: number;
  minRating?: number;
}
