const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280'

export function getPosterUrl(path) {
  if (!path) {
    return null
  }

  return `${TMDB_IMAGE_BASE_URL}${path}`
}

export function getBackdropUrl(path) {
  if (!path) {
    return null
  }

  return `${TMDB_BACKDROP_BASE_URL}${path}`
}

export function getReleaseYear(date) {
  if (!date) {
    return 'TBA'
  }

  return date.slice(0, 4)
}

export function dedupeMovies(movies) {
  const seen = new Set()
  return movies.filter((movie) => {
    if (seen.has(movie.id)) {
      return false
    }

    seen.add(movie.id)
    return true
  })
}
