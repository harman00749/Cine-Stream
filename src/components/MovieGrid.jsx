import MovieCard from './MovieCard'

function MovieGrid({ emptyText, movies }) {
  if (movies.length === 0) {
    return <div className="empty-state">{emptyText}</div>
  }

  return (
    <section className="movie-grid" aria-label="Movie results">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  )
}

export default MovieGrid
