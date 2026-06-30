# Cine-Stream

Cine-Stream is a Netflix-lite media discovery Single Page Application built with React and Vite. It consumes the TMDB REST API to render popular movies, search results, and dedicated movie detail pages without triggering browser page reloads.

## Features

- Popular movies fetched from TMDB.
- High-fidelity responsive movie grid.
- Movie cards with poster, title, release year, and rating.
- Dynamic movie detail route: `/movie/:movieId`.
- Detail page with poster, backdrop, overview, rating, runtime, genres, and TMDB link.
- Debounced search with a 500ms delay.
- Infinite scroll using Intersection Observer.
- Favorites with heart action.
- `/favorites` route for saved movies.
- Favorites persist after browser refresh through localStorage.
- Native image lazy loading with `loading="lazy"`.
- AI Mood Matcher using Gemini or OpenAI when available.
- Local Mood Matcher fallback when AI quota is unavailable.
- Clean modular React structure with pages, routes, hooks, services, context, and components separated.
- `Prompts.md` included for AI debugging documentation.

## Tech Stack

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- TMDB API
- Gemini or OpenAI API for optional mood matching

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GEMINI_API_KEY=optional_gemini_api_key_here
```

`VITE_TMDB_API_KEY` is required for movie data. Gemini/OpenAI keys are optional because the Mood Matcher includes a local fallback.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

For Windows PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

## Build

```bash
npm run build
```

## Deployment

Deploy on Vercel or Netlify.

Recommended Vercel settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Add these Environment Variables in the Vercel project settings:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GEMINI_API_KEY=optional_gemini_api_key_here
VITE_OPENAI_API_KEY=optional_openai_api_key_here
```

After updating environment variables on Vercel, redeploy the project.

## Project Structure

```text
src/
  components/
    MoodMatcher.jsx
    MovieCard.jsx
    MovieGrid.jsx
    Navbar.jsx
    SearchBar.jsx
    StatusMessage.jsx
  contexts/
    FavoritesContext.jsx
    FavoritesContextObject.js
  hooks/
    useDebounce.js
    useFavorites.js
    useInfiniteScroll.js
  pages/
    DiscoverPage.jsx
    FavoritesPage.jsx
    MovieDetailPage.jsx
    NotFoundPage.jsx
  routes/
    AppRoutes.jsx
  services/
    aiApi.js
    tmdbApi.js
  utils/
    movieFormatters.js
  App.css
  App.jsx
  index.css
  main.jsx
```

## Demo Checklist

- Show popular movies loading from TMDB.
- Scroll to the bottom and show infinite scroll appending more movies.
- Type in search and show the 500ms debounce behavior.
- Click a movie card and show the URL changing to `/movie/:movieId`.
- Open the TMDB external link from a movie detail page.
- Heart a movie and open `/favorites`.
- Refresh and show favorites persist.
- Use Mood Matcher and show a suggested movie title being searched.
