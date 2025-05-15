
import React, { useState } from 'react';
import { Filter, ArrowDownAZ, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GenreFilter } from './GenreFilter';
import { YearFilter } from './YearFilter';
import { RatingFilter } from './RatingFilter';

interface FilterBarProps {
  onFilterChange: (filters: { genres: string[]; year?: number; rating?: number }) => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, totalResults }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedRating, setSelectedRating] = useState<number | undefined>();
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const applyFilters = () => {
    onFilterChange({
      genres: selectedGenres,
      year: selectedYear,
      rating: selectedRating,
    });
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedYear(undefined);
    setSelectedRating(undefined);
    onFilterChange({ genres: [], year: undefined, rating: undefined });
  };

  return (
    <div className="sticky top-16 z-40 w-full bg-background/95 backdrop-blur-sm border-b py-3">
      <div className="container px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <p className="text-sm text-muted-foreground">
              {totalResults} {totalResults === 1 ? 'movie' : 'movies'} found
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowDownAZ className="h-4 w-4" />
              <span className="hidden sm:inline">Sort</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Top Rated</span>
            </Button>
          </div>
        </div>
        
        {isFiltersVisible && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pb-2">
            <GenreFilter 
              selectedGenres={selectedGenres}
              onChange={setSelectedGenres}
            />
            <YearFilter
              selectedYear={selectedYear}
              onChange={setSelectedYear}
            />
            <RatingFilter
              selectedRating={selectedRating}
              onChange={setSelectedRating}
            />
            <div className="md:col-span-3 flex justify-end space-x-2 mt-2">
              <Button variant="ghost" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
