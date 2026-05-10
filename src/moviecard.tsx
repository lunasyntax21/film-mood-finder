import type { Movie } from './types'; // Use the shared type
import './moviecard.css';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  isSaved: boolean; // Match the new logic in MovieGrid
  onToggleWatchlist: (e: React.MouseEvent) => void;
}

const MovieCard = ({ movie, onClick, isSaved, onToggleWatchlist }: MovieCardProps) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <button 
        className={`watchlist-btn ${isSaved ? 'saved' : ''}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevents opening the modal when clicking the heart
          onToggleWatchlist(e);
        }}
      >
        {isSaved ? '❤️' : '🤍'}
      </button>
      
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster}`} 
        alt={movie.title} 
        className="movie-poster" 
      />
      
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span>{movie.year}</span>
          {/* .toFixed(1) turns the number into a string for display */}
          <span className="rating">⭐ {movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;