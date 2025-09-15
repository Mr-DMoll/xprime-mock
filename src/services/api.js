// const API_KEY = "d7ddfab1ba6689401acbaeb8c1243156";
// // The URL for fetching movies from the tmdb
// const BASE_URL = "https://api.themoviedb.org/3";

// export const fetchTrendingMovies = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error Fetching trending movies");
//     return [];
//   }
// };

// export const fetchPopularMovies = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error Fetching Popular movies");
//     return [];
//   }
// };

// export const fetchMoviesByGenre = async (genreId) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=1`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error Fetching movies by Genre");
//     return [];
//   }
// };

// export const fetchGenres = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
//     );
//     const data = await response.json();
//     return data.genres;
//   } catch (error) {
//     console.error("Error Fetching genre");
//     return [];
//   }
// };

// export const fetchMovieDetails = async (movieId) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
//     );

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("error fetching Move Details");
//     return [];
//   }
// };

// export const searchMovies = async (query) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&
//             include_adult=false`
//     );

//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("error fetching Move Details");
//     return [];
//   }
// };

// export const getImageURL = (path, size = "original") => {
//   if (!path)
//     return "https://via.placeholder.com/400x600?text=No+tImage+Available";
//   return `https://image.tmdb.org/t/p/${size}${path}`;
// };

// export const fetchNowPlayingMovies = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching now playing movies:", error);
//     return [];
//   }
// };

// export const fetchTopRatedMovies = async (page = 1) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching top rated movies:", error);
//     return [];
//   }
// };

// export const fetchMoviesSorted = async (
//   sortBy = "popularity.desc",
//   page = 1
// ) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${page}`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching sorted movies:", error);
//     return [];
//   }
// };
// export const fetchPopularSeries = async (page = 1) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching popular series:", error);
//     return [];
//   }
// };

// export const fetchTopRatedSeries = async (page = 1) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching top rated series:", error);
//     return [];
//   }
// };

// export const fetchSeriesSorted = async (
//   sortBy = "popularity.desc",
//   page = 1
// ) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${page}`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching sorted series:", error);
//     return [];
//   }
// };

// export const fetchSeriesByGenre = async (genreId, page = 1) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching series by genre:", error);
//     return [];
//   }
// };

// export const fetchSeriesGenres = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`
//     );
//     const data = await response.json();
//     return data.genres;
//   } catch (error) {
//     console.error("Error fetching TV genres:", error);
//     return [];
//   }
// };
// export const searchMulti = async (query, page = 1) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
//         query
//       )}&page=${page}&include_adult=false`
//     );
//     const data = await response.json();
//     // Only return movies + tv (skip "person")
//     return data.results.filter(
//       (item) => item.media_type === "movie" || item.media_type === "tv"
//     );
//   } catch (error) {
//     console.error("Error searching multi:", error);
//     return [];
//   }
// };
