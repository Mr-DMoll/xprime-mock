import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import MyXPrime from "./pages/MyXPrime";
import Mood from "./pages/Mood";
import LoginSignup from "./pages/LoginSignup";
import Settings from "./pages/Settings";
import MovieModal from "./components/Movie/MovieModal"; // ✅ modal import

// ✅ Dynamic document title updater
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/movies":
        document.title = "Movies – xprime.tv";
        break;
      case "/tv-shows":
        document.title = "TV Shows – xprime.tv";
        break;
      case "/my-xprime":
        document.title = "My XPrime – xprime.tv";
        break;
      case "/mood":
        document.title = "Mood – xprime.tv";
        break;
      case "/access":
        document.title = "Login / Sign Up – xprime.tv";
        break;
      case "/settings":
        document.title = "Settings – xprime.tv";
        break;
      default:
        document.title = "xprime.tv";
    }
  }, [location.pathname]);

  return null;
}

// ✅ This wrapper checks context for modalMovie and renders the modal
function GlobalMovieModal() {
  const { modalMovie, setModalMovie } = useAppContext();

  return (
    <MovieModal isOpen={!!modalMovie} onClose={() => setModalMovie(null)}>
      {modalMovie && (
        <div className='text-white'>
          <h2 className='text-2xl font-bold mb-4'>
            {modalMovie.title || modalMovie.name}
          </h2>
          <p className='text-gray-300 text-sm mb-2'>
            {modalMovie.release_date || modalMovie.first_air_date}
          </p>
          <p className='text-gray-400 text-sm mb-4'>
            {modalMovie.overview || "No description available."}
          </p>
          {modalMovie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${modalMovie.backdrop_path}`}
              alt={modalMovie.title}
              className='rounded-md'
            />
          )}
        </div>
      )}
    </MovieModal>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <TitleUpdater />
        <MainLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/tv-shows' element={<TvShows />} />
            <Route path='/my-xprime' element={<MyXPrime />} />
            <Route path='/mood' element={<Mood />} />
            <Route path='/access' element={<LoginSignup />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </MainLayout>

        {/* ✅ Global Modal always mounted */}
        <GlobalMovieModal />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
