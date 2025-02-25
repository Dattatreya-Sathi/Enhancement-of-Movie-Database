import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Pagination from '../Pagination'
import './index.css'

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState({})
  const [apiState, setApiState] = useState('INITIATE')
  const [currentPage, setCurrentPage] = useState(1)

  const getMoviesData = async page => {
    setApiState('LOADING')
    const apiKey = '4bcdbfc2185cce178974a7afc7da3415'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        page: data.page,
        results: data.results.map(eachObj => ({
          id: eachObj.id,
          title: eachObj.title,
          posterPath: `https://image.tmdb.org/t/p/w500${eachObj.poster_path}`,
          voteAverage: eachObj.vote_average,
        })),
        totalPages: data.total_pages,
      }
      setPopularMovies(updatedData)
      setApiState('SUCCESS')
    } else {
      setApiState('FAILURE')
    }
  }

  useEffect(() => {
    getMoviesData(currentPage)
  }, [currentPage])

  const getLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const getSuccessView = () => {
    const {results, totalPages} = popularMovies

    return (
      <div className="row p-0 ms-0 me-0 mt-3">
        <ul className="popular-movies-ul">
          {results.map(movie => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
        <footer>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </footer>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="popular-page-bg-container">
        {apiState === 'LOADING' && getLoadingView()}
        {apiState === 'SUCCESS' && getSuccessView()}
        {apiState === 'FAILURE' && (
          <div className="failure-container">
            <h1>Something Went Wrong</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => getMoviesData(currentPage)}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PopularMovies
