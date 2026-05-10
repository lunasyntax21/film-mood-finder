import type { Movie } from './types';
import { useState, useEffect } from 'react';
import './App.css';
import MovieGrid from './moviegrid';
import { fetchMovies } from './api'; 


const MOODS = ['All', 'cozy', 'intense', 'romantic', 'weird', 'clever', 'heartbreaking'];

function App() {
  const [selectedMood, setSelectedMood] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [view, setView] = useState<'home' | 'watchlist'>('home');
  
  // NEW: State for real data!
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    const savedList = localStorage.getItem('filmMoodWatchlist');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('filmMoodWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    if (view !== 'home') return;

    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const results = await fetchMovies(searchQuery, selectedMood);
        setMovies(results);
      } catch (err: any) {
        setError(err.message || 'Something went wrong fetching movies.');
      } finally {
        setIsLoading(false);
      }
    }, 400); 

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedMood, view]);

  const handleToggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      const isAlreadySaved = prev.some((m) => m.id === movie.id);
      if (isAlreadySaved) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Film Mood Finder</h1>
        <p>Choose how you want to feel tonight.</p>
      </header>

      <div className="nav-tabs">
        <button className={`nav-btn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
          All Movies
        </button>
        <button className={`nav-btn ${view === 'watchlist' ? 'active' : ''}`} onClick={() => setView('watchlist')}>
          My Watchlist ({watchlist.length})
        </button>
      </div>

      {view === 'home' && (
        <>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search titles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="mood-filter">
            {MOODS.map((mood) => (
              <button
                key={mood}
                className={`mood-btn ${selectedMood === mood ? 'active' : ''}`}
                onClick={() => {
                  setSelectedMood(mood);
                  setSearchQuery(''); 
                }}
              >
                {mood}
              </button>
            ))}
          </div>
          
          {/* Real Data Rendering Logic */}
          {isLoading ? (
            <div className="skeleton-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card"></div>
              ))}
            </div>
          ) : error ? (
            <div className="empty-message error-message">
              <h2>Connection Error 🔌</h2>
              <p>{error}</p>
              <button className="clear-btn" onClick={() => { setSelectedMood('All'); setSearchQuery(''); }}>Try Again</button>
            </div>
          ) : movies.length > 0 ? (
            <MovieGrid movies={movies} onSelectMovie={setSelectedMovie} watchlist={watchlist} onToggleWatchlist={handleToggleWatchlist} />
          ) : (
            <div className="empty-message">
              <h2>No movies found 🎬</h2>
              <p>Try adjusting your search or selecting a different mood.</p>
              <button className="clear-btn" onClick={() => { setSelectedMood('All'); setSearchQuery(''); }}>Reset Filters</button>
            </div>
          )}
        </>
      )}

      {view === 'watchlist' && (
        <>
          {watchlist.length > 0 ? (
             <MovieGrid movies={watchlist} onSelectMovie={setSelectedMovie} watchlist={watchlist} onToggleWatchlist={handleToggleWatchlist} />
          ) : (
            <div className="empty-message">
              <h2>Your watchlist is empty 🍿</h2>
              <p>Save some films to build your perfect marathon.</p>
              <button className="clear-btn" onClick={() => setView('home')}>Browse Movies</button>
            </div>
          )}
        </>
      )}

      {/* MODAL */}
      {selectedMovie !== null && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMovie(null)}>✖</button>
            <img src={selectedMovie.poster} alt={selectedMovie.title} className="modal-poster" />
            <div className="modal-details">
              <h2>{selectedMovie.title} <span className="modal-year">({selectedMovie.year})</span></h2>
              <div className="movie-meta">
                <span className="movie-rating">{selectedMovie.rating}</span>
                <span className="movie-genres">{selectedMovie.genres.join(', ')}</span>
              </div>
              <p className="modal-overview">{selectedMovie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;