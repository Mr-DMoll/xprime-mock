import { BASE_URL, API_KEY } from "./config";

export async function fetchTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchNowPlayingMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchTopRatedMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchMoviesSorted(sortBy = "popularity.desc", page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchMoviesByGenre(genreId, page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchMovieDetails(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data || {};
}

export const getImageURL = (path, size = "original") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "https://via.placeholder.com/400x600?text=No+Image+Available";
