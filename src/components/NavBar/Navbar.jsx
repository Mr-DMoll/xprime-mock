import React from "react";
import { FaDiscord } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Importing navbar images
import X from "../../assets/x-twitter.jfif";
import ProfileImage from "../../assets/avatar.webp";

// Import SearchToggle (same one used in MediumScreenNavBar)
import SearchToggle from "../shared/SearchToggle";

function Navbar({ movies = [], series = [] }) {
  const handleResults = (res) => {
    // optional: you can pass results to parent or log them
    // console.log("mobile search results", res);
  };

  return (
    <div className='md:hidden bg-black h-[4rem]'>
      <div className='fixed top-0 left-0 right-0 flex items-center z-50 bg-black text-white px-3'>
        {/* Left side icons */}
        <div className='flex gap-4 p-2'>
          <img
            src={X}
            alt='twitter logo'
            className='w-[2rem] h-[2rem] cursor-pointer'
          />
          <div className='flex items-center justify-center h-10 w-[3rem] hover:bg-white/16 rounded'>
            <FaDiscord size='35' />
          </div>
        </div>

        {/* Right side icons */}
        <div className='flex ml-auto gap-5 items-center'>
          {/* Reuse SearchToggle */}
          <SearchToggle
            movies={movies}
            series={series}
            onResults={handleResults}
          />

          <div className='flex items-center justify-center'>
            <Link to='/access'>
              <img
                src={ProfileImage}
                alt='Profile'
                className='w-[1.9rem] h-[1.9rem] rounded transition ease-in delay-150 hover:scale-114 hover:border-2 hover:border-gray-600'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
