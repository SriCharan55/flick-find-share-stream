
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  thumbnailUrl, 
  title 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = (url: string): string => {
    // Convert YouTube URL to embed URL
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    
    return url;
  };

  // Use a default movie-related background if no thumbnail is provided
  const thumbnailImage = thumbnailUrl || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21';

  return (
    <>
      <div 
        className="relative aspect-video w-full overflow-hidden rounded-lg cursor-pointer group"
        onClick={() => setIsPlaying(true)}
      >
        <img 
          src={thumbnailImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
          <Button 
            className="rounded-full h-16 w-16 flex items-center justify-center bg-primary hover:bg-primary/90"
            onClick={() => setIsPlaying(true)}
          >
            <Play className="h-8 w-8 fill-current" />
            <span className="sr-only">Play video</span>
          </Button>
        </div>
      </div>

      <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-transparent border-none">
          <div className="relative aspect-video w-full">
            <iframe
              src={getEmbedUrl(videoUrl)}
              title={title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <Button 
              className="absolute top-2 right-2 rounded-full h-8 w-8 bg-black/50 hover:bg-black/70"
              onClick={() => setIsPlaying(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close video</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
