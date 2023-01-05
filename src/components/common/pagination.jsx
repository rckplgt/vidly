import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ moviesPerPage, totalMovies, paginate, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={
                number === pageNumber ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  moviesPerPage: PropTypes.number.isRequired,
  totalMovies: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
