import {useState, useEffect, useCallback} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const MovieDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [singleMovieDetail, setMovieDetails] = useState({})
  const [cast, setCast] = useState({})
  const [apiState, setApiState] = useState('INITIATE')
  const apiKey = '4bcdbfc2185cce178974a7afc7da3415'

  const formatedCast = data => ({
    adult: data.adult,
    castId: data.cast_id,
    character: data.character,
    creditId: data.credit_id,
    gender: data.gender,
    id: data.id,
    knownForDepartment: data.known_for_department,
    name: data.name,
    order: data.order,
    originalName: data.original_name,
    popularity: data.popularity,
    profilePath: `https://image.tmdb.org/t/p/w500${data.profile_path}`,
  })

  const getMovieDetails = useCallback(async () => {
    setApiState('LOADING')
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const [movieResponse, castResponse] = await Promise.all([
      fetch(movieUrl),
      fetch(castUrl),
    ])

    try {
      if (!movieResponse.ok || !castResponse.ok) {
        throw new Error('API call failed')
      }

      const data = await movieResponse.json()
      const castData = await castResponse.json()

      console.log(castData)

      const formattedMovie = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        belongsToCollection: data.belongs_to_collection,
        budget: data.budget,
        genres: data.genres,
        homepage: data.homepage,
        id: data.id,
        imdbId: data.imdb_id,
        originCountry: data.origin_country,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        productionCompanies: data.production_companies,
        productionCountries: data.production_countries,
        releaseDate: data.release_date,
        revenue: data.revenue,
        runtime: data.runtime,
        spokenLanguages: data.spoken_languages,
        status: data.status,
        tagline: data.tagline,
        title: data.title,
        video: data.video,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
      }
      setMovieDetails(formattedMovie)
      setCast(castData.cast.map(eachcast => formatedCast(eachcast)))
      setApiState('SUCCESS')
    } catch (error) {
      setApiState('FAILURE')
    }
  }, [id])

  useEffect(() => {
    getMovieDetails()
  }, [getMovieDetails])

  const getLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const getSuccessView = () => {
    const {
      posterPath,
      title,
      overview,
      genres,
      voteAverage,
      runtime,
    } = singleMovieDetail
    // console.log(genres)
    return (
      <div className="singleMovie-bg-container">
        <img className="movie-details-poster" src={posterPath} alt={title} />
        <div className="single-movie-details-container">
          <div>
            <h1 className="single-movie-title">{title}</h1>
            <ul className="single-movie-genre-ul-list">
              {genres.map((genre, index) => (
                <li key={genre.id}>
                  <p>
                    {genre.name}{' '}
                    {index !== genres.length - 1 && <span>&nbsp;|&nbsp;</span>}
                  </p>
                </li>
              ))}
            </ul>
            <div className="rating-duration-container">
              <div className="rating-container">
                <h2 className="popular-movie-rating"> {voteAverage}</h2>
              </div>
              <p className="duration">Duration: {runtime} Min.</p>
            </div>
            <p className="single-movie-overview">{overview}</p>
          </div>
          <div className="cast-container">
            <h1 className="cast-heading">Cast</h1>
            <ul className="cast-ul-container">
              {cast.map(eachCaste => (
                <li className="cast-item" key={eachCaste.id}>
                  <img
                    className="cast-image"
                    src={eachCaste.profilePath}
                    alt={eachCaste.originalName}
                  />
                  <p className="original-name">{eachCaste.originalName}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const getFailureView = () => (
    <div className="failure-container">
      <h1>Something Went Wrong </h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={getMovieDetails}
      >
        Retry
      </button>
    </div>
  )

  const movieDetailsPageResponse = () => {
    switch (apiState) {
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
      <div className="popular-page-bg-container">
        {movieDetailsPageResponse()}
      </div>
    </>
  )
}

export default MovieDetails
