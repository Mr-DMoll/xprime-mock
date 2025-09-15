import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa6";
import Logo from "../../assets/XprimeLogo.webp";
import ProfileImage from "../../assets/avatar.webp";
import { Link } from "react-router-dom";
import SearchToggle from "../shared/SearchToggle"; // import the new component

// Example minimal usage: your top-level can pass the real arrays for movies & series
function MediumScreenNavBar({ movies = [], series = [] }) {
  const handleResults = (res) => {
    // optional callback: e.g. set state in parent to show search page or analytics
    // console.log("search results", res);
  };

  return (
    <div className='hidden md:flex py-3 px-18 items-center text-white justify-between h-[5rem] bg-black'>
      <div className='transform hover:bg-white/20 hover:rotate-10 rounded w-[3rem] h-[3rem] flex items-center justify-center transition delay-300 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>
        <FaDiscord size='35' color='white' />
      </div>

      <div className='w-[8rem] h-[4rem] mr-autopl-20'>
        <Link to='/'>
          <img src={Logo} alt='Logo' />
        </Link>
      </div>

      <div className='flex gap-6 pl-10 mr-auto font-semibold'>
        <Link to='/'>Home</Link>
        <Link to='/movies'>Movies</Link>
        <Link to='/tv-shows'>TV Shows</Link>
        <Link to='/My-XPrime'>My XPrime</Link>
        <Link to='/Mood'>Mood</Link>
      </div>

      {/* RIGHT SIDE: SearchToggle + profile + settings */}
      <div className='flex items-center gap-6'>
        <SearchToggle
          movies={movies}
          series={series}
          onResults={handleResults}
        />
        <Link to='/access'>
          <img
            src={ProfileImage}
            alt='Profile'
            className='w-[1.9rem] h-[1.9rem] rounded transition ease-in delay-150 hover:scale-114 hover:border-2 hover:border-gray-600'
          />
        </Link>
        <Link to='/settings'>
          <IoSettingsSharp size={30} color='gray' />
        </Link>
      </div>
    </div>
  );
}

export default MediumScreenNavBar;
