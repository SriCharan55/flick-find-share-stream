
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface YearFilterProps {
  selectedYear?: number;
  onChange: (year?: number) => void;
}

export const YearFilter: React.FC<YearFilterProps> = ({ selectedYear, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div>
      <Label className="block mb-2">Release Year</Label>
      <Select
        value={selectedYear?.toString() || 'any'}
        onValueChange={(value) => onChange(value !== 'any' ? parseInt(value) : undefined)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any year</SelectItem>
          {years.map(year => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
