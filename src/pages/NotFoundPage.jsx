import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="page-shell">
      <section className="empty-state">
        <h1>Page not found</h1>
        <Link className="primary-link" to="/">
          Return to Discover
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage
