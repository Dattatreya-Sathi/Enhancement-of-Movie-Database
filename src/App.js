import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import MoviesContext from './context/MoviesContext'
import PopularMovies from './components/PopularMovies'
import SearchResults from './components/SearchResults'
import MovieDetails from './components/MovieDetails'
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [searchedResult, setSearchResults] = useState({})
  const [searchInput, setSearchInput] = useState('')
  const [searchApiState, setApiState] = useState('INITIATE')
  const [currentPage, setCurrentPage] = useState(1)

  const getSearchedMoviesData = async (page = 1) => {
    setApiState('LOADING')
    setCurrentPage(page)

    const apiKey = '4bcdbfc2185cce178974a7afc7da3415'
    const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(searchApi)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = {
        page: data.page,
        results: data.results.map(eachObj => ({
          adult: eachObj.adult,
          backdropPath: eachObj.backdrop_path,
          genreIds: eachObj.genre_ids,
          id: eachObj.id,
          originalLanguage: eachObj.original_language,
          originalTitle: eachObj.original_title,
          overview: eachObj.overview,
          popularity: eachObj.popularity,
          posterPath: `https://image.tmdb.org/t/p/w500${eachObj.poster_path}`,
          releaseDate: eachObj.release_date,
          title: eachObj.title,
          video: eachObj.video,
          voteAverage: eachObj.vote_average,
          voteCount: eachObj.vote_count,
        })),
        totalPages: data.total_pages,
        totalResults: data.total_results,
      }
      setSearchResults(updatedData)
      setApiState('SUCCESS')
    } else {
      setApiState('FAILURE')
    }
  }

  const triggerSearch = () => {
    getSearchedMoviesData()
  }

  return (
    <MoviesContext.Provider
      value={{
        searchedResult,
        setSearchResults,
        searchInput,
        setSearchInput,
        triggerSearch,
        searchApiState,
        currentPage,
        setCurrentPage,
        getSearchedMoviesData,
      }}
    >
      <Switch>
        <Route exact path="/" component={PopularMovies} />
        <Route exact path="/search" component={SearchResults} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </MoviesContext.Provider>
  )
}

export default App
