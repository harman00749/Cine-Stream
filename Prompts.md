# Cine-Stream AI Prompt Log

## Assignment Summary

Build a Netflix-lite React SPA that consumes TMDB, renders popular movies, supports search, implements infinite scroll, debounces search requests, persists favorites with localStorage, lazy loads poster assets, and optionally uses Gemini/OpenAI to map a mood prompt to a movie title.

## AI Debugging / Pair-Programming Sessions

### Session 1: Requirement Breakdown

Prompt:

```text
Explain the Cine-Stream sprint requirements and identify the React architecture needed for performance-focused movie discovery.
```

Outcome:

- Identified TMDB popular and search endpoints as the primary data source.
- Confirmed the need for debounced search and Intersection Observer infinite scrolling.
- Confirmed localStorage favorites and a `/favorites` route are required.

### Session 2: Clean Architecture Planning

Prompt:

```text
How should I structure a React app so App.jsx stays small while API services, hooks, context, routes, pages, and components remain separate?
```

Outcome:

- Created separate folders for `components`, `contexts`, `hooks`, `pages`, `routes`, `services`, and `utils`.
- Kept `App.jsx` focused on app providers, navbar, and routes.
- Moved TMDB and AI request logic into service files.

### Session 3: Performance Features

Prompt:

```text
Help me implement debounce, infinite scroll, localStorage favorites, image lazy loading, and AI mood matching in a React movie explorer.
```

Outcome:

- Added a reusable `useDebounce` hook with a 500ms delay.
- Added a reusable `useInfiniteScroll` hook using Intersection Observer.
- Added favorites context synced to localStorage.
- Added `loading="lazy"` on poster images.
- Added AI Mood Matcher that calls Gemini or OpenAI and passes the returned title to TMDB search.
