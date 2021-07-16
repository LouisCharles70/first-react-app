import config from "../config.json";
import httpService from "./httpService";

const genresEndpoint = config.apiEndpoint + "/api/genres"

export async function getGenres() {
  const {data: genres} = await httpService.get(genresEndpoint)

  return genres;
}
