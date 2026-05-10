import "./moviecard.css";

interface MovieProps {
  movie: {
    id: number;
    title: string;
    year: number;
    rating: string;
    genres: string[];
    poster: string;
    overview: string;
  };
  onClick: () => void;
  // 1. Add our new props
  isSaved: boolean;
  onToggleWatchlist: () => void;
}

export default function MovieCard({
  movie,
  onClick,
  isSaved,
  onToggleWatchlist,
}: MovieProps) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        className="movie-poster"
      />

      <div className="movie-info">
        <h2>
          {movie.title} <span className="movie-year">({movie.year})</span>
        </h2>

        <div className="movie-meta">
          <span className="movie-rating">{movie.rating}</span>
          <span className="movie-genres">{movie.genres.join(", ")}</span>
        </div>

        <p className="movie-overview">{movie.overview}</p>

        {/* 2. Update the button to react to its saved state */}
        <button
          className={`watchlist-btn ${isSaved ? "saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // Stops the modal from opening!
            onToggleWatchlist();
          }}
        >
          {isSaved ? "✓ Remove from Watchlist" : "+ Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}
