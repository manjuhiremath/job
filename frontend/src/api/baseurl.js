
import axios from "axios";

export const baseUrl = "http://localhost:3000/api";
export default axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getToken= ()=>{
  return localStorage.getItem('token');
}
export const checkToken=()=>{
  if(localStorage.getItem('token') !== undefined){
    return true;
  }
  return false;
}