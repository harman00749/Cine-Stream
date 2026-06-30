import { useCallback, useEffect, useState } from 'react'
import MoodMatcher from '../components/MoodMatcher'
import MovieGrid from '../components/MovieGrid'
import SearchBar from '../components/SearchBar'
import StatusMessage from '../components/StatusMessage'
import { useDebounce } from '../hooks/useDebounce'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { suggestMovieTitle } from '../services/aiApi'
import { fetchPopularMovies, searchMovies } from '../services/tmdbApi'
import { dedupeMovies } from '../utils/movieFormatters'

function DiscoverPage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [suggestedTitle, setSuggestedTitle] = useState('')
  const [moodStatus, setMoodStatus] = useState('idle')

  const debouncedQuery = useDebounce(query, 500)
  const canLoadMore = page < totalPages && status !== 'loading'

  const loadMovies = useCallback(
    async ({ nextPage, reset = false }) => {
      const activeQuery = debouncedQuery.trim()

      try {
        setStatus('loading')
        setError('')

        const data = activeQuery
          ? await searchMovies(activeQuery, nextPage)
          : await fetchPopularMovies(nextPage)

        setMovies((currentMovies) =>
          reset
            ? data.results ?? []
            : dedupeMovies([...currentMovies, ...(data.results ?? [])]),
        )
        setPage(data.page ?? nextPage)
        setTotalPages(Math.min(data.total_pages ?? 1, 500))
        setStatus('success')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    },
    [debouncedQuery],
  )

  useEffect(() => {
    loadMovies({ nextPage: 1, reset: true })
  }, [debouncedQuery, loadMovies])

  const loadNextPage = useCallback(() => {
    if (canLoadMore) {
      loadMovies({ nextPage: page + 1 })
    }
  }, [canLoadMore, loadMovies, page])

  const sentinelRef = useInfiniteScroll({
    canLoadMore,
    isLoading: status === 'loading',
    onLoadMore: loadNextPage,
  })

  async function handleMoodSubmit(mood) {
    try {
      setMoodStatus('loading')
      setError('')
      const title = await suggestMovieTitle(mood)
      setSuggestedTitle(title)
      setQuery(title)
      setMoodStatus('success')
    } catch (moodError) {
      setError(moodError.message)
      setMoodStatus('error')
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Netflix-lite SPA</p>
          <h1>Discover movies without loading the whole universe at once.</h1>
          <p>
            Cine-Stream uses debounced TMDB search, intersection-observer
            infinite scroll, lazy poster assets, and persistent favorites.
          </p>
        </div>
      </section>

      <section className="controls-panel">
        <SearchBar query={query} onChange={setQuery} />
        <MoodMatcher
          disabled={moodStatus === 'loading'}
          suggestedTitle={suggestedTitle}
          onMoodSubmit={handleMoodSubmit}
        />
      </section>

      {error ? <StatusMessage title="Heads up" text={error} /> : null}

      <div className="results-heading">
        <div>
          <p className="eyebrow">{debouncedQuery ? 'Search' : 'Popular'}</p>
          <h2>{debouncedQuery ? `Results for "${debouncedQuery}"` : 'Popular Movies'}</h2>
        </div>
        <span>Page {page} of {totalPages}</span>
      </div>

      <MovieGrid
        movies={movies}
        emptyText={
          status === 'loading' ? 'Loading movies...' : 'No movies found.'
        }
      />

      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />

      {status === 'loading' && movies.length > 0 ? (
        <StatusMessage title="Loading more" text="Fetching the next TMDB page..." />
      ) : null}
    </main>
  )
}

export default DiscoverPage
