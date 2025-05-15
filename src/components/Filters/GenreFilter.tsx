
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface GenreFilterProps {
  selectedGenres: string[];
  onChange: (genres: string[]) => void;
}

// All available genres
const allGenres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
];

export const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenres, onChange }) => {
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onChange(selectedGenres.filter(g => g !== genre));
    } else {
      onChange([...selectedGenres, genre]);
    }
  };

  return (
    <div>
      <Label className="block mb-2">Genres</Label>
      <div className="flex flex-wrap gap-2">
        {allGenres.map(genre => (
          <Badge
            key={genre}
            variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>
    </div>
  );
};
