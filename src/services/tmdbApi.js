const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

function getApiKey() {
  return import.meta.env.VITE_TMDB_API_KEY
}

async function requestTmdb(path, params = {}) {
  const apiKey = getApiKey()

  if (!apiKey) {
    throw new Error('Missing VITE_TMDB_API_KEY. Add it to your .env file.')
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('language', 'en-US')

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('TMDB request failed. Check your API key or network.')
  }

  return response.json()
}

export function fetchPopularMovies(page = 1) {
  return requestTmdb('/movie/popular', { page })
}

export function searchMovies(query, page = 1) {
  return requestTmdb('/search/movie', {
    include_adult: false,
    page,
    query,
  })
}

export function fetchMovieDetails(movieId) {
  return requestTmdb(`/movie/${movieId}`)
}
