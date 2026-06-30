import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import { FavoritesProvider } from './contexts/FavoritesContext'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Navbar />
        <AppRoutes />
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
