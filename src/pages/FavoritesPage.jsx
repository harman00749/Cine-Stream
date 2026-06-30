import MovieGrid from '../components/MovieGrid'
import { useFavorites } from '../hooks/useFavorites'

function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <main className="page-shell">
      <section className="favorites-hero">
        <p className="eyebrow">Saved locally</p>
        <h1>My Favorites</h1>
        <p>
          Hearted movies are synced with localStorage, so this list persists
          after a hard browser refresh.
        </p>
      </section>
      <MovieGrid
        movies={favorites}
        emptyText="No favorites yet. Heart a movie from Discover to save it here."
      />
    </main>
  )
}

export default FavoritesPage
