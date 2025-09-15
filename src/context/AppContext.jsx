import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);

  const addFavorite = (movie) => setFavorites((prev) => [...prev, movie]);

  const removeFavorite = (id) =>
    setFavorites((prev) => prev.filter((m) => m.id !== id));

  return (
    <AppContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        modalMovie,
        setModalMovie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
