export const baseUrl = "http://localhost:3000/api";

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
});