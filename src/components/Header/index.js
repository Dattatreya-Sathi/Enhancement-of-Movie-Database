import {useContext} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import MoviesContext from '../../context/MoviesContext'
import './index.css'

const Header = () => {
  const {searchInput, setSearchInput, triggerSearch} = useContext(MoviesContext)
  const history = useHistory()
  const location = useLocation()

  const onChangeInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = event => {
    event.preventDefault()

    triggerSearch()
    history.push('/search')
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <Link className="link" to="/">
          <h1 className="navbar-brand text-white fw-bold">movieDB</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="link" to="/">
                <h1
                  className={`nav-link text-white ${
                    location.pathname === '/' ? 'active fw-bold' : ''
                  }`}
                >
                  Popular
                </h1>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/top-rated">
                <h1
                  className={`nav-link text-white ${
                    location.pathname === '/top-rated' ? 'active fw-bold' : ''
                  }`}
                >
                  Top Rated
                </h1>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/upcoming">
                <h1
                  className={`nav-link text-white ${
                    location.pathname === '/upcoming' ? 'active fw-bold' : ''
                  }`}
                >
                  Upcoming
                </h1>
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={onClickSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={onChangeInput}
              value={searchInput}
              role="textbox"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Header
