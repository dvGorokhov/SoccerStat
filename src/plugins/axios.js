import axios from "axios";

const baseURL = "https://api.football-data.org/v2";

export const axiosInstance = axios.create({
  baseURL,
  headers: { "X-Auth-Token": process.env.VUE_APP_API_TOKEN },
});
