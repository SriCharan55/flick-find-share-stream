
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Star, Share } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/contexts/MovieContext';
import { useAuth } from '@/contexts/AuthContext';
import { VideoPlayer } from '@/components/MovieDetails/VideoPlayer';
import { StreamingInfo } from '@/components/MovieDetails/StreamingInfo';
import { CastList } from '@/components/MovieDetails/CastList';
import { SocialShare } from '@/components/MovieDetails/SocialShare';
import { MovieGrid } from '@/components/MovieGrid';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieById, addToWatchlist, getRecommendations, checkStreamingAvailability } = useMovies();
  const { user } = useAuth();
  const [movie, setMovie] = useState(id ? getMovieById(id) : null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [streamingServices, setStreamingServices] = useState([]);
  
  useEffect(() => {
    if (id) {
      const foundMovie = getMovieById(id);
      if (foundMovie) {
        setMovie(foundMovie);
        setRecommendedMovies(getRecommendations(id));
        setStreamingServices(checkStreamingAvailability(id));
      } else {
        // Movie not found
        navigate('/not-found');
      }
    }
  }, [id, getMovieById, navigate, getRecommendations, checkStreamingAvailability]);
  
  if (!movie) {
    return (
      <Layout>
        <div className="container px-4 py-10 text-center">
          <h1 className="text-2xl font-bold">Loading movie details...</h1>
        </div>
      </Layout>
    );
  }

  const handleAddToWatchlist = () => {
    if (!user) {
      toast('Please login to add movies to your watchlist');
      return;
    }
    
    addToWatchlist(movie.id);
  };
  
  return (
    <Layout>
      {/* Hero Section with Backdrop */}
      <div 
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container px-4 py-8">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-rating stroke-rating mr-1" />
                <span className="font-medium">{movie.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">/10</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span>{movie.releaseYear}</span>
              <span className="text-muted-foreground">•</span>
              <span>{movie.duration} min</span>
              <span className="text-muted-foreground">•</span>
              <span>{movie.genres.join(', ')}</span>
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={handleAddToWatchlist} className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Add to Watchlist</span>
              </Button>
              <SocialShare movieTitle={movie.title} movieId={movie.id} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Poster and Streaming */}
          <div className="md:col-span-1">
            <img 
              src={movie.posterUrl} 
              alt={movie.title}
              className="w-full rounded-lg shadow-lg mb-6"
            />
            
            <StreamingInfo services={streamingServices} />
          </div>
          
          {/* Right Column - Details and Trailer */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-base text-muted-foreground mb-8">{movie.description}</p>
                
                {movie.trailerUrl && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                    <VideoPlayer 
                      videoUrl={movie.trailerUrl} 
                      thumbnailUrl={movie.backdropUrl} 
                      title={`${movie.title} Trailer`}
                    />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="cast" className="pt-6">
                <CastList cast={movie.cast} director={movie.director} />
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
                  <Button className="mt-4" disabled={!user} onClick={() => toast.info("Review feature coming soon!")}>
                    Write a Review
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Recommendations Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <MovieGrid movies={recommendedMovies} />
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetail;
