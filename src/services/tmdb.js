import axios from "axios";

const API_KEY = "d02c111747db8dbf07da0edab882d93f"; // we will replace this with env variable
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
  const res = await axios.get(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
  );
  return res.data.results;
};
