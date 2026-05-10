import type { Movie } from './types';
import MovieCard from "./moviecard";
import "./moviegrid.css";


interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  // 1. Accept the new watchlist props
  watchlist: Movie[];
  onToggleWatchlist: (movie: Movie) => void;
}

export default function MovieGrid({
  movies,
  onSelectMovie,
  watchlist,
  onToggleWatchlist,
}: MovieGridProps) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => {
        // 2. Check if this specific movie is in the watchlist
        const isSaved = watchlist.some(
          (savedMovie) => savedMovie.id === movie.id,
        );

        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onSelectMovie(movie)}
            isSaved={isSaved}
            onToggleWatchlist={() => onToggleWatchlist(movie)}
          />
        );
      })}
    </div>
  );
}
