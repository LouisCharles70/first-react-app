import config from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const authEndpoint = "/auth";

http.setJwt(getJwt())

export async function login(email, password){
   const {data: jwt} = await http.post(authEndpoint,{email, password});
   localStorage.setItem("token",jwt);
}

export function logout(){
   localStorage.removeItem("token");
}

export function getCurrentUser(){
   let user = null;

   try {
      const jwt = localStorage.getItem("token");
      user = jwtDecode(jwt);
   } catch (e) {
      console.log("Unable to retrieve user: ",e);
   }
   return user;
}

export function loginWithJwt(jwt){
   localStorage.setItem("token",jwt);
}

export function getJwt(){
   return localStorage.getItem("token");
}
