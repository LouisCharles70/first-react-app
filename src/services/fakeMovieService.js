import httpService from "../services/httpService";
import config from "../config.json";
import * as fakeGenreService from "../services/fakeGenreService";

const moviesEndpoint = config.apiEndpoint+"/api/movies"


export async function getMovies() {
  const {data: movies} = await httpService.get(moviesEndpoint)

  return movies;
}

// export async function getMovie(id) {
//   const {data: movie} = await httpService.get(moviesEndpoint+"/"+id)
//
//   return movie;
// }
//
// export async function saveMovie(movie) {
//   let movieInDb = await getMovie(movie._id) || {};
//   let genres = await fakeGenreService.getGenres();
//
//   movieInDb.title = movie.title;
//   movieInDb.genre = genres.find(g => g._id === movie.genreId);
//   movieInDb.numberInStock = movie.numberInStock;
//   movieInDb.dailyRentalRate = movie.dailyRentalRate;
//
//   if (!movieInDb._id) {
//     movieInDb._id = Date.now().toString();
//
//     await httpService.post(moviesEndpoint,{movie: movieInDb});
//   }
//
//   return movieInDb;
// }

export async function deleteMovie(id) {
  await httpService.delete(moviesEndpoint+"/"+id);

  const {data : movies } = await getMovies();
  return movies;
}
