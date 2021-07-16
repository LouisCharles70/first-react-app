import http from "./httpService"
import config from "../config.json";

const usersEndpoint = config.apiEndpoint + "/api/users";

export function register(user) {
   return http.post(usersEndpoint,{
      email: user.username,
      password: user.password,
      name: user.name
   })
}
