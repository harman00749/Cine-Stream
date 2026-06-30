import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import { getPosterUrl, getReleaseYear } from '../utils/movieFormatters'

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)
  const posterUrl = getPosterUrl(movie.poster_path)

  return (
    <article className="movie-card">
      <div className="poster-frame">
        <Link className="poster-link" to={`/movie/${movie.id}`} aria-label={`Open ${movie.title} details`}>
          {posterUrl ? (
            <img loading="lazy" src={posterUrl} alt={`${movie.title} poster`} />
          ) : (
            <div className="poster-fallback">No Poster</div>
          )}
        </Link>
        <button
          className={`heart-button ${favorite ? 'is-active' : ''}`}
          type="button"
          aria-label={favorite ? `Remove ${movie.title}` : `Favorite ${movie.title}`}
          onClick={() => toggleFavorite(movie)}
        >
          Heart
        </button>
      </div>
      <div className="movie-copy">
        <Link className="movie-title-link" to={`/movie/${movie.id}`}>
          <h2>{movie.title}</h2>
        </Link>
        <div className="movie-meta">
          <span>{getReleaseYear(movie.release_date)}</span>
          <strong>{movie.vote_average?.toFixed(1) ?? 'NR'}</strong>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
