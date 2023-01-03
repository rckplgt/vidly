import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/utils";

class Movies extends Component {
  //initializing state
  state = {
    movies: getMovies(), //getting movies from the movies array. Can be done using axios4

    //data for pagination
    //moviesCurrentPage: 1,
    moviesCurrentPage: 1,
    pageSize: 4, //movies per page
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
    //console.log(movie);
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ moviesCurrentPage: pageNumber });
  };

  //Main render method
  render() {
    const indexOfLastMovie = this.state.moviesCurrentPage * this.state.pageSize;
    const indexOfFirstMovie = indexOfLastMovie - this.state.pageSize;
    this.state.moviesCurrentPage = this.state.movies.slice(
      indexOfFirstMovie,
      indexOfLastMovie
    );

    if (this.state.movies.length === 0) {
      return <p>There are no movies in the database</p>;
    } else {
      return (
        <div>
          <p>Showing {this.state.movies.length} movies in the stock</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Liked</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.moviesCurrentPage.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      onClick={() => this.handleLike(movie)}
                      liked={movie.liked}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalMovies={this.state.movies.length}
            pageSize={this.state.pageSize}
            paginate={this.handlePageChange}
            moviesCurrentPage={this.state.moviesCurrentPage}
          />
        </div>
      );
    }
  }
}

export default Movies;
