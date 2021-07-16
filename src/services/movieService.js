import config from "../config.json";
import http from "./httpService";

const moviesEndpoint = "/movies"

export async function getMovies(){
   const {data: movies} = await http.get(moviesEndpoint)

   return movies;
}

export async function deleteMovie(movieId){
   await http.delete(moviesEndpoint+"/"+movieId);
}

export async function getMovie(id) {
   const {data: movie} = await http.get(moviesEndpoint+"/"+id)

   return movie;
}

export async function saveMovie(movie) {
   // Case where we update the movie
   if(movie._id){
      const body = {...movie};
      delete body._id;

      await http.put(moviesEndpoint+"/"+movie._id,body);

      return movie;
   }

   // Case where we create a movie
   await http.post(moviesEndpoint,movie);

   return movie;
}
