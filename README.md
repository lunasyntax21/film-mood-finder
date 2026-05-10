🍿 Film Mood Finder
A sleek, responsive movie discovery application that helps users find the perfect film based on their current emotional "vibe." Instead of browsing by dry categories, users choose moods like "Cozy," "Intense," or "Clever" to get curated results.

🚀 [Live Demo Link Coming Soon]
✨ Features
Mood-Based Filtering: Custom logic that maps complex emotions to specific TMDB genre combinations.

Real-time Search: Instant movie lookups with a built-in debounce to optimize API usage.

Persistent Watchlist: Save your "must-watch" films to a local watchlist that stays saved even after refreshing the page (via localStorage).

Responsive Design: Fully optimized for mobile, tablet, and desktop viewing.

Interactive UI: Modern modal system for viewing movie details and high-fidelity loading skeletons for a premium feel.

🛠️ Tech Stack
React 18 (Functional Components, Hooks)

TypeScript (Strict type safety)

CSS3 (Flexbox, Grid, Custom Variables, Animations)

TMDB API (Real-world movie data and posters)

Vite (Build tool)

📦 Installation & Local Setup
Clone the repository:

Bash
git clone https://github.com/your-username/film-mood-finder.git
cd film-mood-finder
Install dependencies:

Bash
npm install
Set up environment variables:

Create a .env file in the root directory.

Add your TMDB API Key:

Code snippet
VITE_TMDB_API_KEY=your_api_key_here
Run the app:

Bash
npm run dev
🧠 What I Learned
API Transformation: How to take "messy" external API data and map it into clean, typed interfaces for a React frontend.

Performance Optimization: Implementing debouncing for search inputs to prevent unnecessary API calls and rate-limiting.

Security Best Practices: Managing sensitive API keys using .env files and ensuring they are never committed to version control via .gitignore.

UX Design: Using loading skeletons instead of basic spinners to reduce perceived wait times.

🔮 Future Improvements
User Reviews: Integrate real user ratings and reviews from the TMDB community.

Trailer Integration: Add a "Play Trailer" button that opens a YouTube embed inside the modal.

AI Recommendations: Use a lightweight AI model to suggest movies based on more complex natural language prompts.

💼 Resume Bullet Point
Built a responsive movie discovery app that recommends films by mood using React, TypeScript, CSS3, TMDB API, and localStorage watchlist persistence.