import React, { useEffect, useState, useRef, useCallback } from "react";
// importing api service functions
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchMoviesSorted,
  fetchMoviesByGenre,
} from "../services/movies";

import { fetchGenres } from "../services/genres";
import { CirclePlus } from "lucide-react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";

// importing the mobile and md/lg screens NavBar

import Navbar from "../components/Navbar/Navbar";
import MediumScreenNavBar from "../components/Navbar/MediumScreenNavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";

function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("popular");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // 🔑 Load movies based on filter
  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      let data = [];

      if (selectedFilter === "popular") {
        data = await fetchPopularMovies(page);
      } else if (selectedFilter === "top_rated") {
        data = await fetchTopRatedMovies(page);
      } else if (selectedFilter === "rating") {
        data = await fetchMoviesSorted("vote_average.desc", page);
      } else if (selectedFilter === "genre" && selectedGenre) {
        data = await fetchMoviesByGenre(selectedGenre, page);
      }

      setMovies((prev) => [...prev, ...(data || [])]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedFilter, selectedGenre, page]);

  //  Fetch genres only once
  useEffect(() => {
    const getGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList || []);
    };
    getGenres();
  }, []);

  //  Reload movies when filter changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [selectedFilter, selectedGenre]);

  //  Load movies whenever page changes
  useEffect(() => {
    loadMovies();
  }, [page, loadMovies]);

  //  Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  return (
    <div className='bg-black'>
      {/* <MediumScreenNavBar -------------------------------------------------------------/>
      <Navbar /> */}

      <h1 className='text-white font-bold text-2xl mb-6 pl-12'>Movies</h1>

      {/*  Filter Buttons */}
      <div className='flex flex-wrap gap-3 mb-6 items-center justify-center'>
        <button
          onClick={() => setSelectedFilter("popular")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            selectedFilter === "popular"
              ? "bg-purple-900/40 border-1 border-purple-800 text-white font-bold"
              : "bg-purple-900/30 text-gray-200 hover:bg-purple-900/40"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => setSelectedFilter("top_rated")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            selectedFilter === "top_rated"
              ? "bg-purple-900/40 border-1 border-purple-800 font-bold text-white"
              : "bg-purple-900/30 text-gray-200 hover:bg-purple-900/40"
          }`}
        >
          Top Rated
        </button>
        <button
          onClick={() => setSelectedFilter("rating")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            selectedFilter === "rating"
              ? "bg-purple-900/40 border-1 border-purple-800 font-bold text-white"
              : "bg-purple-900/30 text-gray-200 hover:bg-purple-900/40"
          }`}
        >
          Rating
        </button>

        {/* Genre Dropdown */}
        <select
          onChange={(e) => {
            setSelectedFilter("genre");
            setSelectedGenre(e.target.value);
          }}
          value={selectedGenre || ""}
          className='px-4 py-2 rounded-lg bg-purple-900/40  text-gray-200 text-sm text-bg-purple'
        >
          <option value=''>Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🎬 Movie Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='relative group rounded-lg overflow-hidden shadow-md bg-gray-900'
          >
            {/* Container with fixed aspect ratio */}
            <div className='w-full aspect-[2/3s]'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='w-full h-full object-cover transition duration-300 group-hover:scale-105'
              />
            </div>

            {/* Hover overlay */}
            <div
              className='absolute inset-0 flex flex-col items-center justify-center gap-3 
                bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <CirclePlus className='text-white' size={38} />
              <IoInformationCircleOutline className='text-white' size={38} />
              <FaRegCirclePlay className='text-white' size={38} />
            </div>
          </div>
        ))}
      </div>

      {/* Loader */}
      <div ref={loaderRef} className='text-center py-6 text-white'>
        {loading ? "Loading more movies..." : "Scroll for more"}
      </div>
      <BottomNavbar />
    </div>
  );
}

export default MoviesGrid;
