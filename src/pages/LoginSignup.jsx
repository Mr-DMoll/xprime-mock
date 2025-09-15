import React from "react";
import BackgroundImage from "../assets/peakyblinders.avif";
import Navbar from "../components/Navbar/Navbar";
import MediumScreenNavBar from "../components/Navbar/MediumScreenNavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";

function LoginSignup() {
  return (
    <div
      className='min-h-screen text-white flex flex-col relative bg-cover bg-center'
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/60 z-0'></div>

      {/* Navbars should always be above overlay */}
      <div className='relative z-30'>
        <Navbar />
        <MediumScreenNavBar />
      </div>

      {/* Login box */}
      <div
        className='flex flex-col items-center justify-center gap-6 relative z-20
                   bg-black/80 p-10 rounded-3xl border border-white/40 max-w-md mx-auto mt-60'
      >
        <h1 className='text-4xl font-bold border-b-2 border-purple-500'>
          Welcome Back
        </h1>

        <input
          type='text'
          placeholder='Email/Username'
          className='w-full px-4 py-2 rounded bg-white/20'
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full px-4 py-2 rounded bg-white/20'
        />

        <button className='w-full py-2 rounded-lg font-semibold bg-purple-500/80 transition'>
          SIGN IN
        </button>

        <p className='text-white/40 text-center'>
          New to Xprime?{" "}
          <a href='#' className='text-white font-bold'>
            Sign up now
          </a>
        </p>
      </div>

      {/* Bottom navbar above overlay */}
      <div className='relative z-30'>
        <BottomNavbar />
      </div>
    </div>
  );
}

export default LoginSignup;
