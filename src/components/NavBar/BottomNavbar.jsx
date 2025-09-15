import React from "react";
import { House, Library, Settings } from "lucide-react";
import { Link } from "react-router-dom";

// Mobile nav bar at the bottom of the screen which consists of the home, my Prime and settings navigation

function BottomNavbar() {
  return (
    <div className='flex md:hidden'>
      <div className='fixed inset-x-0 bottom-0 h-16 z-[9999] flex items-center bg-black justify-between px-[2rem]'>
        <Link to='/'>
          <div className='flex flex-col items-center text-white hover:bg-white/15 delay-200  w-[6rem] rounded-xl cursor-pointer p-2'>
            <House color='white' />
            <p>Home</p>
          </div>
        </Link>
        <Link to='/My-XPrime'>
          <div className='flex flex-col items-center text-white w-[6rem] hover:bg-white/15 delay-200  cursor-pointer rounded-xl p-2'>
            <Library color='white' />
            <p>My Prime</p>
          </div>
        </Link>
        <Link to='/settings'>
          <div className='flex flex-col items-center text-white w-[6rem] hover:bg-white/15 delay-200  rounded-xl cursor-pointer p-2'>
            <Settings color='white' />
            <p>Settings</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BottomNavbar;
