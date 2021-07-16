import http from "./httpService"

const usersEndpoint = "/users";

export function register(user) {
   return http.post(usersEndpoint,{
      email: user.username,
      password: user.password,
      name: user.name
   })
}
