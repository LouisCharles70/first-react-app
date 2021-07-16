import React, {Component} from "react";
import {getMovies, deleteMovie} from "../services/movieService";
import {getGenres} from "../services/genreService";

import {toast} from "react-toastify";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import {Link} from "react-router-dom";

export default class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4,
      selectedGenre: "All Genres",
      searchedQuery: "",
      sortColumn:{path: "title", order: "asc"}
   }

   async componentDidMount() {
      const genres = [{_id: 0 ,name: "All Genres"},...await getGenres()]

      const movies = await getMovies();

      this.setState({
         movies: movies,
         genres
      })
   }

   handleDelete = async (movieId) => {
      const originalMovies = this.state.movies;
      let movies = originalMovies.filter(m => m._id !==movieId);
      this.setState({movies: movies})

      try{
         await deleteMovie(movieId);
      } catch(ex) {
         if(ex.response && ex.response.status === 404)
            toast.error("This movie has already been deleted")

         this.setState({movies: originalMovies})
      }

   }

   handleLike = (movie) => {
      const movies = [...this.state.movies];
      const index = movies.indexOf(movie);

      movies[index] = {...movie};
      movies[index].liked = !movie.liked;

      this.setState({movies})
   }

   handlePageSelection = (page) => {
      this.setState({currentPage: page});
   }

   handleGenreSelection = (genre) => {
      this.setState({
         currentPage: 1,
         selectedGenre: genre.name
      });
   }

   handleSort = (sortColumn) => {
      this.setState({ sortColumn });
   }

   handleSearchInput = ({currentTarget: input}) => {
      this.setState({
         selectedGenre: "All Genres",
         searchedQuery: input.value,
         currentPage: 1
      });
   }

   getPagedData = () => {
      const filteredMovies = this.state.movies.filter(movie => {
            let genreFilter = true;
            let movieNameFilter = true;

            if(this.state.selectedGenre!=="All Genres")
               genreFilter = movie.genre.name === this.state.selectedGenre

            if(this.state.searchedQuery)
               movieNameFilter = movie.title.toUpperCase().includes(this.state.searchedQuery.toUpperCase())

            return genreFilter && movieNameFilter;
         });

      const sortedMovies = _.orderBy(filteredMovies, [this.state.sortColumn.path], [this.state.sortColumn.order])

      const movies = paginate(
         sortedMovies,
         this.state.currentPage,
         this.state.pageSize
      );

      return {
         totalCount: filteredMovies.length,
         data: movies
      };
   }

   render() {
      const {totalCount, data : movies} = this.getPagedData();
      const user = this.props.user;

      return (<div className={"row"}>
         <div className={"col-2"} style={{marginTop: "70px"}}>
            <ListGroup items={this.state.genres} onItemSelected={this.handleGenreSelection} selectedItem={this.state.selectedGenre}/>
         </div>

         <div className={"col"}>
            {user && (<Link to={"/movies/new"} className={"btn btn-primary mb-2"}>
               New movie
            </Link>)}

            {totalCount > 0 && <div>Showing {totalCount} movies in the database

               <input type="text" className="form-control my-2" placeholder={"Search movie..."}
                      onChange={this.handleSearchInput}
               />

               <MoviesTable
                  movies={movies} sortColumn={this.state.sortColumn}
                  onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort}
               />

               <Pagination
                  itemsCount={totalCount}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage}
                  onPageSelected={this.handlePageSelection}
               />
            </div>}


            {!this.state.movies.length && <div>
               No movies retrieved...
            </div>}

         </div>
      </div>)
   }
}
