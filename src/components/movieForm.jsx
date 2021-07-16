import React from "react";
import {getMovie, saveMovie} from "../services/movieService";
import Joi from "joi-browser";
import Form from "./common/form";
import {getGenres} from "../services/genreService";

export default class MovieForm extends Form {
   state = {
      data: null,
      errors: {},
      genres: []
   }

   async populateGenres(){
      const genres = await getGenres();
      this.setState({ genres });
   }

   async populateMovie(){
      try{
         const movieId = this.props.match.params.movieId;
         if(movieId==="new") {
            this.setState({data: {
                  title: "",
                  genreId: this.state.genres[0]._id,
                  numberInStock: 0,
                  dailyRentalRate: 0
               }
            })

            return;
         }

         const movie = await getMovie(movieId);
         this.setState({data: this.mapToViewModel(movie)});
      } catch(ex) {
         return this.props.history.replace("/not-found");
      }
   }

   async componentDidMount() {
      await this.populateGenres();
      await this.populateMovie();
   }

   //Optional: map the data coming from the API
   mapToViewModel(movie){
      return{
         _id: movie._id,
         title: movie.title,
         genreId: movie.genre._id,
         numberInStock: movie.numberInStock,
         dailyRentalRate: movie.dailyRentalRate
      }
   }

   doSubmit = async () => {
      const movie = this.state.data;
      await saveMovie({
         _id: movie._id,
         title: movie.title,
         genreId: movie.genreId,
         numberInStock: movie.numberInStock,
         dailyRentalRate: movie.dailyRentalRate
      });

      this.props.history.push("/movies");
   }

   schema = {
      _id: Joi.string(),
      title: Joi.string()
         .required()
         .label("Title"),
      genreId: Joi.string()
         .required()
         .label("Genre"),
      numberInStock: Joi.number()
         .min(0)
         .max(100)
         .required(),
      dailyRentalRate: Joi.number()
         .min(0)
         .required()
   }

   render() {
      const {
         match
      } = this.props;

      if(!this.state.data)
         return (<div>Loading...</div>)

      return (<div>
         <h1>Movie Form {match.params.movieId}</h1>

         {this.renderInput('title','Title')}
         {this.renderSelect('genreId','_id','name',this.state.genres)}
         {this.renderInput('numberInStock','Number in Stock','number')}
         {this.renderInput('dailyRentalRate','Rate','number')}

         {this.renderButton("Save")}
      </div>)
   }
}
