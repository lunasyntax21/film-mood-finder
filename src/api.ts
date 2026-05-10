const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MOOD_TO_GENRE: Record<string, string> = {
  'cozy': '35,10751,16',       // Comedy, Family, Animation
  'intense': '53,28,80',       // Thriller, Action, Crime
  'romantic': '10749,18',      // Romance, Drama
  'clever': '9648,878,53',     // Mystery, Sci-Fi, Thriller
  'weird': '14,878,9648',      // Fantasy, Sci-Fi, Mystery
  'heartbreaking': '18,10749', // Drama, Romance
};

const GENRE_MAP: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 
  878: "Sci-Fi", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

export const fetchMovies = async (searchQuery: string, mood: string) => {
  let url = '';

  if (searchQuery) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;
  } else if (mood !== 'All' && MOOD_TO_GENRE[mood]) {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${MOOD_TO_GENRE[mood]}`;
  } else {
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  }

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies from TMDB.');
  }

  const data = await response.json();

  return data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : 'Unknown',
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'NR',
    genres: movie.genre_ids.map((id: number) => GENRE_MAP[id]).filter(Boolean),
    moods: [], 
    poster: movie.poster_path 
      ? `${IMAGE_BASE_URL}${movie.poster_path}` 
      : 'https://via.placeholder.com/500x750?text=No+Poster',
    overview: movie.overview || 'No overview available.',
  }));
};