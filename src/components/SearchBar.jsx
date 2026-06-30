function SearchBar({ query, onChange }) {
  return (
    <label className="search-control">
      <span>Search movies</span>
      <input
        type="search"
        value={query}
        placeholder="Search Inception, Avatar, Batman..."
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
