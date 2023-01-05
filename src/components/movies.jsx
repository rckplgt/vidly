import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";

class Movies extends Component {
  //initializing state
  state = {
    movies: [], //getting movies from the movies array. Can be done using axios4
    genres: [],

    //data for pagination
    currentPage: 1,
    moviesPerPage: 3, //movies per page
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = (genre) => {
    // this.setState({ selectedGenre: genre });
  };

  //Main render method
  render() {
    //Pagination Data
    const indexOfLastMovie = this.state.currentPage * this.state.moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - this.state.moviesPerPage;
    const currentMovies = this.state.movies.slice(
      indexOfFirstMovie,
      indexOfLastMovie
    );

    if (this.state.movies.length === 0) {
      return (
        <p className="p-1 mb-1 bg-danger text-white">
          There are no movies in the database
        </p>
      );
    } else {
      return (
        <div className="container-fuid">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem={this.state.selectedGenre}
                textPropery="name"
                valueProperty="_id"
              />
            </div>
            <div className="col">
              <p className="p-1 mb-1 bg-info text-white">
                Showing {this.state.movies.length} movies in the stock. You are
                on page {this.state.currentPage}. There are{" "}
                {currentMovies.length} movies in this page
              </p>
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
                  {currentMovies.map((movie) => (
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
                moviesPerPage={this.state.moviesPerPage}
                pageNumber={this.state.currentPage}
                paginate={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Movies;
