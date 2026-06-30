import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import { useFavorites } from '../hooks/useFavorites'
import { fetchMovieDetails } from '../services/tmdbApi'
import { getBackdropUrl, getPosterUrl, getReleaseYear } from '../utils/movieFormatters'

function MovieDetailPage() {
  const { movieId } = useParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [movie, setMovie] = useState(null)
  const [status, setStatus] = useState({ type: 'loading', message: 'Loading movie details...' })

  useEffect(() => {
    let ignore = false

    async function loadMovie() {
      try {
        setStatus({ type: 'loading', message: 'Loading movie details...' })
        const data = await fetchMovieDetails(movieId)

        if (!ignore) {
          setMovie(data)
          setStatus({ type: '', message: '' })
        }
      } catch (error) {
        if (!ignore) {
          setStatus({ type: 'error', message: error.message })
        }
      }
    }

    loadMovie()

    return () => {
      ignore = true
    }
  }, [movieId])

  if (status.message && !movie) {
    return (
      <main className="page-shell">
        <StatusMessage title={status.type === 'error' ? 'Heads up' : 'Loading'} text={status.message} />
        <Link className="primary-link" to="/">
          Back to movies
        </Link>
      </main>
    )
  }

  const posterUrl = getPosterUrl(movie.poster_path)
  const backdropUrl = getBackdropUrl(movie.backdrop_path)
  const favorite = isFavorite(movie.id)

  return (
    <main className="page-shell">
      <section
        className="movie-detail-hero"
        style={
          backdropUrl
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(2, 6, 23, 0.96), rgba(2, 6, 23, 0.74)), url(${backdropUrl})`,
              }
            : undefined
        }
      >
        <div className="detail-poster-frame">
          {posterUrl ? (
            <img loading="lazy" src={posterUrl} alt={`${movie.title} poster`} />
          ) : (
            <div className="poster-fallback">No Poster</div>
          )}
        </div>

        <div className="detail-copy">
          <p className="eyebrow">{getReleaseYear(movie.release_date)} Movie Detail</p>
          <h1>{movie.title}</h1>
          {movie.tagline ? <p className="tagline">{movie.tagline}</p> : null}
          <p>{movie.overview || 'No overview available for this title.'}</p>

          <div className="detail-stats">
            <span>Rating: {movie.vote_average?.toFixed(1) ?? 'NR'}</span>
            <span>Runtime: {movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
            <span>{movie.genres?.map((genre) => genre.name).join(', ') || 'Genre N/A'}</span>
          </div>

          <div className="detail-actions">
            <button type="button" onClick={() => toggleFavorite(movie)}>
              {favorite ? 'Remove Favorite' : 'Add Favorite'}
            </button>
            <a
              className="primary-link secondary-link"
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Open on TMDB
            </a>
            <Link className="primary-link secondary-link" to="/">
              Back
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MovieDetailPage
