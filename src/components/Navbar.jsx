import { NavLink } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

function Navbar() {
  const { favoriteCount } = useFavorites()

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <NavLink className="brand" to="/">
          <span className="brand-mark">CS</span>
          <span>Cine-Stream</span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/">Discover</NavLink>
          <NavLink to="/favorites">
            Favorites <span className="favorite-badge">{favoriteCount}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
