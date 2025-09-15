import React, { useEffect, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d7ddfab1ba6689401acbaeb8c1243156";

const getImageURL = (path, size = "original") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "https://via.placeholder.com/400x600?text=No+Image";

async function fetchTrendingMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

async function fetchGenres() {
  try {
    const res = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

// Fetch videos for a movie (returns array)
async function fetchMovieVideos(movieId) {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
}

export default function FeaturedHero() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState({});

  // trailer states
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const trailerTimerRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const list = await fetchTrendingMovies();
      const genreList = await fetchGenres();

      const genreMapObj = {};
      genreList.forEach((g) => {
        genreMapObj[g.id] = g.name;
      });
      setGenres(genreMapObj);

      if (list.length > 0) {
        const randomMovie = list[Math.floor(Math.random() * list.length)];
        setMovie(randomMovie);
      }
      setLoading(false);
    };

    loadData();

    // cleanup on unmount
    return () => {
      if (trailerTimerRef.current) {
        clearTimeout(trailerTimerRef.current);
      }
    };
  }, []);

  // When movie changes, set a 15s timer (only on md+ screens)
  useEffect(() => {
    if (!movie) return;

    // clear any existing timer
    if (trailerTimerRef.current) {
      clearTimeout(trailerTimerRef.current);
      trailerTimerRef.current = null;
    }

    const isMdOrLarger = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;

    if (!isMdOrLarger) {
      // Do not autoplay on small screens
      return;
    }

    // set timer to fetch trailer and play after 3s
    trailerTimerRef.current = setTimeout(async () => {
      // fetch videos for movie
      const videos = await fetchMovieVideos(movie.id);
      if (!videos || videos.length === 0) return; // no videos

      // Prefer official YouTube Trailer, fallback to any YouTube video
      const youtubeTrailers = videos.filter(v => v.site === 'YouTube');
      if (youtubeTrailers.length === 0) return;

      // try to find an official trailer first
      let chosen = youtubeTrailers.find(v => /trailer/i.test(v.type) && (v.official || /official/i.test(v.name)))
                   || youtubeTrailers.find(v => /trailer/i.test(v.type))
                   || youtubeTrailers[0];

      if (chosen && chosen.key) {
        setTrailerKey(chosen.key);
        setIsTrailerPlaying(true);
      }
    }, 3000);

    // cleanup when movie changes
    return () => {
      if (trailerTimerRef.current) {
        clearTimeout(trailerTimerRef.current);
        trailerTimerRef.current = null;
      }
    };
  }, [movie]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>No featured movie</div>;

  // helper to stop trailer (e.g., when user clicks Play/More Info)
  const stopTrailer = () => {
    if (trailerTimerRef.current) {
      clearTimeout(trailerTimerRef.current);
      trailerTimerRef.current = null;
    }
    setIsTrailerPlaying(false);
    setTrailerKey(null);
  };

  return (
    <section className="relative mx-[2.6rem] md:mx-0">
      {/* Image or Trailer container */}
      <div className="h-[39rem] w-full rounded-3xl overflow-hidden pt-2 md:rounded-none md:h-140 md:pt-10 bg-black">
        {isTrailerPlaying && trailerKey ? (
          // YouTube embed: muted autoplay for reliable autoplay behaviour
          <iframe
            title={`${movie.title || movie.name} trailer`}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <img
            className="h-full w-full object-cover"
            src={getImageURL(movie.backdrop_path)}
            alt={movie.title || movie.name}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 rounded-2xl pb-[8rem] gap-3">
        <h2 className="text-3xl font-bold text-white mb-2 text-center text-shadow-lg text-shadow-black md:text-start md:justify-start">
          {movie.title || movie.name}
        </h2>
        
        {/*Movie Description*/}
        <p className="hidden md:text-shadow-sm md:text-shadow-black md:block md:text-base md:text-gray-200 md:mb-4 md:text-start md:max-w-[50%]">
          {movie.overview}
        </p>

        <p className="text-lg text-gray-300 mb-4 text-center font-bold text-shadow-sm text-shadow-black md:hidden">
          {movie.genre_ids?.map((id) => genres[id]).join(" - ")}
        </p>

        <div className="flex gap-4 items-center justify-center md:items-start md:justify-start">
          <div className="w-[8rem] h-[3rem] bg-white/80 flex items-center justify-center gap-3 rounded-md transition delay-150 duration-200 ease-in-out hover:-translate-y-[0.07rem] hover:scale-101 hover:shadow-sm hover:shadow-gray-400">
            <FaPlay color="black" />
            <button
              className="font-bold"
              onClick={() => {
                stopTrailer();
                window.location.href = `/watch/${movie.id}`;
              }}
            >
              Play
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 w-[8rem] h-[3rem] bg-gray-600 opacity-75 hover:opacity-50 rounded-md transition delay-150 duration-200 ease-in-out hover:-translate-y-[0.07rem] hover:scale-100.1 hover:shadow-md hover:shadow-gray-400 hover:bg-gray-600">
            <IoMdInformationCircleOutline color="white" size="30" />
            <button
              className="text-white font-bold"
              onClick={() => {
                console.log("Open details modal for", movie.id);
                stopTrailer();
              }}
            >
              More Info
            </button>
          </div>

          {/* If trailer is playing show a Stop button */}
          {isTrailerPlaying && (
            <button
              className="flex ml-3 px-3 py-1 bg-gray-600 text-white rounded-md"
              onClick={() => stopTrailer()}
            >
              Stop Trailer
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
