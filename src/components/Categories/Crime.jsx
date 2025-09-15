import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useScroll } from "../../hooks/useScroll";
import { CirclePlus } from "lucide-react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext"; // ✅ import context

function Crime() {
  // TMDB genre id = 80 (Crime)
  const { data: movies, loading } = useFetch(
    `${import.meta.env.VITE_TMDB_BASE_URL}/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&with_genres=80`
  );

  const { scrollRef, scroll } = useScroll();
  const { setModalMovie } = useAppContext(); // ✅ context setter

  return (
    <div className='relative'>
      <h1 className='text-white font-bold text-2xl py-8 ml-8'>Crime</h1>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full'
      >
        <ChevronLeft className='text-white' size={28} />
      </button>

      {/* Movies container */}
      <div
        ref={scrollRef}
        className='flex overflow-x-auto overflow-y-hidden gap-6 px-12 pb-8 pt-8 hide-scrollbar scroll-smooth'
      >
        {loading ? (
          <p className='text-white'>Loading…</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className='relative group w-36 h-52 flex-shrink-0 cursor-pointer'
              onClick={() => setModalMovie(movie)} // ✅ opens modal on click
            >
              <div className='w-36 h-52 overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-110'>
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
                    bg-gradient-to-t from-black/80 via-black/40 to-transparent'
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
          ))
        )}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full'
      >
        <ChevronRight className='text-white' size={28} />
      </button>
    </div>
  );
}

export default Crime;
