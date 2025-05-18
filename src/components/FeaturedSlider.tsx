
import React from 'react';
import { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface FeaturedSliderProps {
  title: string;
  movies: Movie[];
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ title, movies }) => {
  return (
    <section className="py-8 px-4 sm:py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {movies.map(movie => (
              <CarouselItem 
                key={movie.id} 
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <div className="h-full">
                  <MovieCard movie={movie} className="h-full" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious className="relative inset-0 translate-y-0 left-0" />
            <CarouselNext className="relative inset-0 translate-y-0 right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
