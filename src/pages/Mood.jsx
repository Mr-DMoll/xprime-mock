import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MediumScreenNavBar from "../components/Navbar/MediumScreenNavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";
import { CiFaceSmile } from "react-icons/ci";
import { Search } from "lucide-react";

function Mood() {
  return (
    <div className='bg-black w-screen h-screen'>
      {/* <Navbar />
      <MediumScreenNavBar /> ---------------------------------------------------------------*/}

      <div className='flex flex-col items-center justify-center h-[22rem] gap-7'>
        <h1 className='text-white text-5xl font-bold'>What's Your Mood?</h1>
        <h3 className='text-white text-xl'>
          Let us find your perfect entertainment match
        </h3>

        {/* Search Input */}
        <div className='relative w-[40rem]'>
          <CiFaceSmile
            className='absolute left-4 top-1/2 -translate-y-1/2 text-white/30'
            size={20}
          />
          <input
            type='text'
            placeholder='Search mood...'
            className='w-full h-[3.5rem] pl-12 pr-12 border border-white/30 rounded bg-transparent text-white/30 placeholder-gray-400 focus:outline-none'
          />
          <Search
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white/30'
            size={24}
          />
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Mood;
