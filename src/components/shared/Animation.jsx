import React, { useEffect, useState, useRef } from "react";
import { fetchPopularMovies } from "../../services/movies";
import { CirclePlus } from "lucide-react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Animation() {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMoviesByGenre(16);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching Animation movies:", error);
      }
    };

    getMovies();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth + 24; // image width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className='relative'>
      <h1 className='text-white font-bold text-2xl py-8 ml-8'>Animation</h1>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full'
      >
        <ChevronLeft className='text-white' size={38} />
      </button>

      {/* Movies container */}
      <div
        ref={scrollRef}
        className='flex overflow-x-scroll gap-6 px-12 pb-8 pt-8 hide-scrollbar scroll-smooth'
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='relative group w-36 h-52 flex-shrink-0'
          >
            <div className='w-36 h-52 overflow-hidden shadow-md transform transition delay-200 duration-300 ease-in-out group-hover:scale-120'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='w-full h-full object-cover'
              />

              {/* Hover overlay */}
              <div
                className='absolute inset-0 flex flex-col items-center justify-center gap-2 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                bg-gradient-to-t from-black/80 via-black/40 to-transparent delay-700'
              >
                <div className='bg-black/40 rounded-full p-2'>
                  <CirclePlus color='white' size={24} />
                </div>
                <div className='bg-black/40 rounded-full p-2'>
                  <IoInformationCircleOutline color='white' size={24} />
                </div>
                <div className='bg-black/40 rounded-full p-2'>
                  <FaRegCirclePlay color='white' size={24} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full'
      >
        <ChevronRight className='text-white' size={38} />
      </button>
    </div>
  );
}

export default Animation;
