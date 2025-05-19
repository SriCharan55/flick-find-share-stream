
import React, { useEffect, useCallback } from 'react';
import { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedSliderProps {
  title: string;
  movies: Movie[];
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ title, movies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true,
  });

  // Auto-scroll function
  const autoScroll = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Set up auto-scrolling
  useEffect(() => {
    if (!emblaApi) return;
    
    const intervalId = setInterval(autoScroll, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [emblaApi, autoScroll]);

  // Make sure we have enough movies to fill the carousel
  const displayMovies = movies.length >= 6 ? movies : [...movies, ...movies].slice(0, 8);

  return (
    <section className="py-8 px-4 sm:py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayMovies.map((movie, index) => (
                <div 
                  key={`${movie.id}-${index}`} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] pl-4 first:pl-0"
                >
                  <div className="pr-4">
                    <MovieCard movie={movie} className="h-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 z-10"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 z-10"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
