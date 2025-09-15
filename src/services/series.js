import { BASE_URL, API_KEY } from "./config";

export async function fetchPopularSeries(page = 1) {
  const res = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchTopRatedSeries(page = 1) {
  const res = await fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchSeriesSorted(sortBy = "popularity.desc", page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchSeriesByGenre(genreId, page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`
  );
  const data = await res.json();
  return data.results || [];
}
