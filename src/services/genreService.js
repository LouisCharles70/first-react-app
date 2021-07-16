import http from "./httpService";
import config from "../config.json";

const genresEndpoint = config.apiEndpoint + "/api/genres"

export async function getGenres(){
   const {data: genres} = await http.get(genresEndpoint);

   return genres;
}
