import { useCallback, useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContextObject'

const STORAGE_KEY = 'cine-stream-favorites'

function loadFavorites() {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(savedFavorites) ? savedFavorites : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((movie) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item.id === movie.id)
      if (exists) {
        return currentFavorites.filter((item) => item.id !== movie.id)
      }

      return [movie, ...currentFavorites]
    })
  }, [])

  const isFavorite = useCallback(
    (movieId) => favorites.some((movie) => movie.id === movieId),
    [favorites],
  )

  const value = useMemo(
    () => ({
      favorites,
      favoriteCount: favorites.length,
      isFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, toggleFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
