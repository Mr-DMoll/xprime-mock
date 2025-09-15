// src/services/genres.js
import { BASE_URL, API_KEY } from "./config";

export async function fetchMovieGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  return data.genres || [];
}

export async function fetchSeriesGenres() {
  const res = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const data = await res.json();
  return data.genres || [];
}

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error Fetching genre");
    return [];
  }
};
