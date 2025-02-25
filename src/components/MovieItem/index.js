import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movie} = props
  const {id, title, voteAverage, posterPath} = movie

  return (
    <li className="movie-item col-12 col-sm-6 col-lg-2 mb-3">
      <div>
        <img src={posterPath} alt={title} className="popular-movies-poster" />
        <h1 className="popular-movie-title">{title}</h1>
      </div>
      <div className="movie-details-container">
        <Link to={`/movie/${id}`}>
          <button type="button" className="view-details-btn">
            View Details
          </button>
        </Link>
        <div className="rating-container">
          <h2 className="popular-movie-rating"> {voteAverage}</h2>
        </div>
      </div>
    </li>
  )
}

export default MovieItem
