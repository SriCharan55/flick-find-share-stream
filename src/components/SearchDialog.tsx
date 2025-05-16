
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/contexts/MovieContext';
import { Movie } from '@/types';
import { VoiceSearch } from './VoiceSearch';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const { searchMovies, isLoading } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        const searchResults = await searchMovies(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, searchMovies]);

  const handleSelect = (movieId: string) => {
    navigate(`/movie/${movieId}`);
    onOpenChange(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  const handleVoiceResult = (transcript: string) => {
    setQuery(transcript);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Search movies</DialogTitle>
          <DialogDescription>
            Type or use voice search to find movies by title or genre
          </DialogDescription>
        </DialogHeader>
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for movies, genres..."
            className="pl-10 pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear</span>
              </Button>
            )}
            <VoiceSearch onResult={handleVoiceResult} />
          </div>
        </div>

        {isLoading ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center p-2 rounded-md hover:bg-secondary cursor-pointer"
                onClick={() => handleSelect(movie.id)}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-16 w-12 object-cover rounded"
                />
                <div className="ml-3">
                  <h4 className="font-medium">{movie.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {movie.releaseYear} • {movie.genres.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">No results found</p>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
