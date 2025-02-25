import {useContext} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Pagination from '../Pagination'
import MoviesContext from '../../context/MoviesContext'
import './index.css'

const SearchResults = () => {
  const {
    searchedResult,
    searchApiState,
    triggerSearch,
    currentPage,
    getSearchedMoviesData,
  } = useContext(MoviesContext)

  const getLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const getSuccessView = () => {
    const {results} = searchedResult
    // console.log(currentPage)
    return (
      <div className="row p-0 ms-0 me-0 mt-3">
        {results.length > 0 ? (
          <ul className="popular-movies-ul">
            {results.map(eachMovie => (
              <MovieItem key={eachMovie.id} movie={eachMovie} />
            ))}
          </ul>
        ) : (
          <h1 className="text-center">No Results Found</h1>
        )}
        {results.length > 0 && (
          <footer>
            <Pagination
              onPageChange={newPage => getSearchedMoviesData(newPage)}
              currentPage={currentPage}
              totalPages={searchedResult.totalPages}
            />
          </footer>
        )}
      </div>
    )
  }

  const getFailureView = () => (
    <div className="failure-container">
      <h1>Something Went Wrong </h1>
      <button type="button" className="btn btn-primary" onClick={triggerSearch}>
        Retry
      </button>
    </div>
  )

  const getHomePageResponse = () => {
    switch (searchApiState) {
      case 'LOADING':
        return getLoadingView()
      case 'SUCCESS':
        return getSuccessView()
      case 'FAILURE':
        return getFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="popular-page-bg-container">{getHomePageResponse()}</div>
    </>
  )
}

export default SearchResults
