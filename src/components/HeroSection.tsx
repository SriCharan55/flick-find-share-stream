
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types';

interface HeroSectionProps {
  movie: Movie;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>
      
      <div className="container relative h-full flex flex-col justify-center px-4 md:px-6">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl text-white tracking-tight animate-fade-in">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-rating stroke-rating mr-1" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.duration} min</span>
          </div>
          
          <p className="text-base md:text-lg text-white/80 line-clamp-3">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="gap-2">
              <Link to={`/movie/${movie.id}`}>
                <Play className="h-5 w-5" />
                Watch Trailer
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="bg-background/20 hover:bg-background/40 border-white/20 text-white">
              <Link to={`/movie/${movie.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
