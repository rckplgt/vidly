import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  //initializing state
  state = {
    movies: [], //getting movies from the movies array. Can be done using axios4
    genres: [],

    //data for pagination
    currentPage: 1,
    moviesPerPage: 5,

    //data for genre select
    selectedGenre: [],

    //Data for sorting
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if ((sortColumn.path = path))
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn: sortColumn });
  };

  //Main render method
  render() {
    //Filtering data for genre selection
    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;

    //Sorting data
    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    //Pagination Data [this shall be based on the filtered movies.]
    const indexOfLastMovie = this.state.currentPage * this.state.moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - this.state.moviesPerPage;
    const currentMovies = sorted.slice(indexOfFirstMovie, indexOfLastMovie);

    if (this.state.movies.length === 0) {
      return (
        <p className="p-3 mb-2 bg-danger text-white">
          There are no movies in the database.
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
              <p className="p-2 mb-2 bg-primary text-white">
                Showing {filtered.length} movies in the stock/current selection.
                Double-click the colum headers to sort.
              </p>

              <MoviesTable
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                currentMovies={currentMovies}
                liked={currentMovies.liked}
              />

              <Pagination
                totalMovies={filtered.length}
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
