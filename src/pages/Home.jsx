import React from "react";
import Navbar from "../components/Navbar/Navbar";
import MediumScreenNavBar from "../components/NavBar/MediumScreenNavBar";
import BottomNavbar from "../components/NavBar/BottomNavbar";

import FeaturedHero from "../components/Movie/FeaturedHero";
import TrendingMovies from "../components/Movie/TrendingMovies";
import CinemaMovies from "../components/Movie/CinemaMovies";

import Adventure from "../components/Categories/Adventure";
import Comedy from "../components/Categories/Comedy";
import Drama from "../components/Categories/Drama";
import Horror from "../components/Categories/Horror";
import Crime from "../components/Categories/Crime";
import Documentary from "../components/Categories/Documentary";
import History from "../components/Categories/History";
import Music from "../components/Categories/Music";

import PopularTvShows from "../components/Popular/PopularTvShows";
import PopularOnXPRIME from "../components/Popular/PopularOnXPRIME";

import Footer from "../components/shared/Footer";
import Animation from "../components/shared/Animation";

function Home() {
  return (
    <div className='bg-black'>
      {/* <Navbar /> */}
      {/* <MediumScreenNavBar /> */}
      <FeaturedHero />
      <TrendingMovies />
      <CinemaMovies />
      <Animation />
      <Adventure />
      <Comedy />
      <Drama />
      <Horror />
      <PopularTvShows />
      <Crime />
      <Documentary />
      <PopularOnXPRIME />
      <History />
      <Music />
      {/* <Footer /> */}
      {/* <BottomNavbar /> */}
    </div>
  );
}

export default Home;
