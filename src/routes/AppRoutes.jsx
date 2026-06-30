import { Route, Routes } from 'react-router-dom'
import DiscoverPage from '../pages/DiscoverPage'
import FavoritesPage from '../pages/FavoritesPage'
import MovieDetailPage from '../pages/MovieDetailPage'
import NotFoundPage from '../pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DiscoverPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
