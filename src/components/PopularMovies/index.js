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

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => getMoviesData(currentPage)}
      >
        Retry
      </button>
    </div>
  )

  const getSuccessView = () => {
    const {results} = popularMovies

    return (
      <div className="home-bg-container">
        <ul className="popular-movies-ul">
          {results.map(movie => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="popular-page-bg-container">
        {apiState === 'LOADING' && getLoadingView()}
        {apiState === 'SUCCESS' && getSuccessView()}
        {apiState === 'FAILURE' && renderFailureView()}
        <Pagination
          totalPages={popularMovies.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  )
}

export default PopularMovies
