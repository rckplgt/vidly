import React from "react";
import Like from "./common/like";

const MoviesTable = ({ onLike, onDelete, currentMovies, onSort }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th
            onDoubleClick={() => onSort("title")}
            style={{ cursor: "pointer" }}
          >
            Title
          </th>
          <th
            onDoubleClick={() => onSort("genre.name")}
            style={{ cursor: "pointer" }}
          >
            Genre
          </th>
          <th
            onDoubleClick={() => onSort("numberInStock")}
            style={{ cursor: "pointer" }}
          >
            Stock
          </th>
          <th
            onDoubleClick={() => onSort("dailyRentalRate")}
            style={{ cursor: "pointer" }}
          >
            Rate
          </th>
          <th>Liked</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {currentMovies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.like} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
