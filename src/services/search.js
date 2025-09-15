// src/services/search.js
import { BASE_URL, API_KEY } from "./config";

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function searchSeries(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

// Multi-search (movies + TV shows, no people)
export async function searchMulti(query, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    );
    const data = await response.json();
    // Only return movies + tv (skip "person")
    return data.results.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
  } catch (error) {
    console.error("Error searching multi:", error);
    return [];
  }
}
