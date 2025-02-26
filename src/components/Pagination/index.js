import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  onClickNext = () => {
    const {onPageChange, currentPage, totalPages} = this.props
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1) // Call API with updated page number
    }
  }

  onClickPrev = () => {
    const {onPageChange, currentPage} = this.props
    if (currentPage > 1) {
      onPageChange(currentPage - 1) // Call API with updated page number
    }
  }

  render() {
    const {currentPage, totalPages} = this.props

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={this.onClickPrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          <li className="page-item">
            <p className="page-link">{currentPage}</p>
          </li>
          <li
            className={`page-item ${
              currentPage >= totalPages ? 'disabled' : ''
            }`}
          >
            <button
              type="button"
              className="page-link"
              onClick={this.onClickNext}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination
