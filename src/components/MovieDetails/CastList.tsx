
import React from 'react';

interface CastListProps {
  cast: string[];
  director: string;
}

export const CastList: React.FC<CastListProps> = ({ cast, director }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Cast & Crew</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <h4 className="text-sm text-muted-foreground">Director</h4>
          <p>{director}</p>
        </div>
        <div>
          <h4 className="text-sm text-muted-foreground">Cast</h4>
          <p>{cast.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
