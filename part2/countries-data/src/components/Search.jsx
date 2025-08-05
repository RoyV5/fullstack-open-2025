const Search = ( { searchTerm, setSearchTerm }) => {
  return (
    <div>
			<label htmlFor="search">Search for a country:</label>
      <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
    </div>
  )
}

export default Search
