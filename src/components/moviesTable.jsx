import React, {Component} from "react";
import Like from "./common/like";
import Table from "./common/table";
import {Link} from "react-router-dom";
import {getCurrentUser} from "../services/authService";

export default class MoviesTable extends Component {
   state = {
      columns:[
         {key: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
         {path: "genre.name", label: "Genre"},
         {path: "numberInStock", label: "Stock"},
         {path: "dailyRentalRate", label: "Rate"},
         {key: "like", content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>}
      ]
   }

   deleteColumn = {
      key: "delete",
      content: movie => (<button onClick={() => this.props.onDelete(movie._id)} className={"btn btn-danger btn-sm"}>
         Delete
      </button>)
   }

   constructor() {
      super();

      const user = getCurrentUser();
      if(user && user.isAdmin)
         this.state.columns.push(this.deleteColumn);

   }



   render() {
      const {
         movies
      } = this.props;

      return (<Table
         data={movies} columns={this.state.columns}
         sortColumn={this.props.sortColumn}
         onSort={this.props.onSort}
      />)
   }
}
