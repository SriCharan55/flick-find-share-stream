
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import { cn } from '@/lib/utils';

interface FeaturedSliderProps {
  title: string;
  movies: Movie[];
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ title, movies }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 400);
    }
  };

  return (
    <section className="section-padding relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full", !canScrollLeft && "opacity-50 cursor-not-allowed")}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full", !canScrollRight && "opacity-50 cursor-not-allowed")}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>
      
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-6 scrollbar-none snap-x"
        onScroll={checkScrollButtons}
      >
        {movies.map(movie => (
          <div key={movie.id} className="min-w-[200px] w-[200px] md:min-w-[220px] md:w-[220px] lg:min-w-[240px] lg:w-[240px] snap-start flex">
            <MovieCard movie={movie} className="w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};
