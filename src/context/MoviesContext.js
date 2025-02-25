import React from 'react'

const MoviesContext = React.createContext({
  searchedResult: [],
  setSearchResults: () => {},
  searchInput: '',
  setSearchInput: () => {},
  triggerSearch: () => {},
  searchApiState: 'INITIATE',
  currentPage: 1,
  setCurrentPage: () => {},
  getSearchedMoviesData: () => {},
})

export default MoviesContext
