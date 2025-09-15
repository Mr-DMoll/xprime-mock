import React from "react";

import Navbar from "../components/Navbar/Navbar";
import MediumScreenNavBar from "../components/Navbar/MediumScreenNavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";

function MyXPrime() {
  return (
    <div className='bg-black w-screen h-screen'>
      {/* <Navbar ------------------------------------------------------------------------------/>
      <MediumScreenNavBar /> */}
      <h1 className='pl-12 font-semibold text-3xl text-white pt-[4rem]'>
        My XPrime
      </h1>
      <p className='flex items-center justify-center h-130 text-white/40 text-lg'>
        You haven't added any titles to your list yet
      </p>
      <BottomNavbar />
    </div>
  );
}

export default MyXPrime;
