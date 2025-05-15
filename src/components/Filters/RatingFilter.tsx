
import React from 'react';
import { Star } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface RatingFilterProps {
  selectedRating?: number;
  onChange: (rating?: number) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({ selectedRating, onChange }) => {
  return (
    <div>
      <Label className="block mb-2">Minimum Rating</Label>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-rating stroke-rating mr-1" />
            <span>{selectedRating || 0}</span>
            <span className="text-muted-foreground">/10</span>
          </div>
          {selectedRating && (
            <button
              className="text-sm text-primary hover:underline"
              onClick={() => onChange(undefined)}
            >
              Reset
            </button>
          )}
        </div>
        <Slider
          defaultValue={[0]}
          value={[selectedRating || 0]}
          max={10}
          step={0.1}
          onValueChange={(value) => onChange(value[0] > 0 ? value[0] : undefined)}
        />
      </div>
    </div>
  );
};
