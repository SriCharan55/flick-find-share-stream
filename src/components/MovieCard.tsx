
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Movie } from '@/types';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/contexts/MovieContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, className }) => {
  const { addToWatchlist } = useMovies();
  const { user } = useAuth();

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast('Please login to add movies to your watchlist');
      return;
    }
    
    addToWatchlist(movie.id);
    toast.success('Added to watchlist!');
  };

  // Add error handling for image loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x450?text=Movie+Poster';
  };

  return (
    <div className={cn('movie-card group h-full flex flex-col', className)}>
      <Link to={`/movie/${movie.id}`} className="block relative flex-grow">
        <div className="aspect-[2/3] w-full relative">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="text-white">
            <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 fill-rating stroke-rating mr-1" />
              <span className="text-sm">{movie.rating.toFixed(1)}</span>
              <span className="mx-2 text-xs">•</span>
              <span className="text-sm">{movie.releaseYear}</span>
            </div>
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-background/20 hover:bg-background/40 border-white/20"
                onClick={handleAddToWatchlist}
              >
                <Heart className="h-4 w-4 mr-2" />
                Watchlist
              </Button>
            </div>
          </div>
        </div>
      </Link>
      <div className="movie-card-content py-2 px-2">
        <h3 className="font-medium text-base truncate">{movie.title}</h3>
        <div className="flex items-center mt-1 text-muted-foreground">
          <Star className="h-4 w-4 fill-rating stroke-rating mr-1" />
          <span className="text-sm">{movie.rating.toFixed(1)}</span>
          <span className="mx-2 text-xs">•</span>
          <span className="text-sm">{movie.releaseYear}</span>
        </div>
      </div>
    </div>
  );
};
