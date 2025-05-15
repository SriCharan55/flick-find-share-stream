
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StreamingService } from '@/types';

interface StreamingInfoProps {
  services: StreamingService[];
}

export const StreamingInfo: React.FC<StreamingInfoProps> = ({ services }) => {
  const getServiceUrl = (service: StreamingService) => {
    // This would normally be a real URL with the movie ID
    if (service === 'netflix') return 'https://www.netflix.com/';
    if (service === 'prime') return 'https://www.amazon.com/Prime-Video/';
    return '#';
  };

  if (!services.length) {
    return (
      <div className="mt-6 p-4 rounded-lg bg-secondary text-center">
        <p className="text-muted-foreground">
          Currently not available on Netflix or Amazon Prime
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Available on</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.includes('netflix') && (
          <Button 
            className="w-full bg-netflix hover:bg-netflix-hover flex items-center justify-center gap-2"
            asChild
          >
            <a href={getServiceUrl('netflix')} target="_blank" rel="noopener noreferrer">
              <span>Watch on Netflix</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        
        {services.includes('prime') && (
          <Button 
            className="w-full bg-prime hover:bg-prime-hover flex items-center justify-center gap-2"
            asChild
          >
            <a href={getServiceUrl('prime')} target="_blank" rel="noopener noreferrer">
              <span>Watch on Prime Video</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
