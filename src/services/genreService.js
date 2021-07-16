import http from "./httpService";

const genresEndpoint = "/genres"

export async function getGenres(){
   const {data: genres} = await http.get(genresEndpoint);

   return genres;
}
