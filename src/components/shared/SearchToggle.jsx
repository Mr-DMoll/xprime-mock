import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { searchMulti } from "../../services/search"; // we'll add this in api.js

export default function SearchToggle() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setResults([]);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Perform search
  const performSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const data = await searchMulti(query.trim()); // TMDB API call
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  // Icon click
  const onSearchIconClick = () => {
    if (!open) {
      setOpen(true);
      return;
    }
    performSearch();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div ref={containerRef} className='relative flex items-center'>
      {/* Search input overlay */}
      {open && (
        <form
          onSubmit={onSubmit}
          className='absolute right-12 top-1/2 -translate-y-1/2 z-50 w-[22rem]'
        >
          <div className='flex items-center rounded-md border border-purple-600 bg-black/80 px-3 py-1'>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search for movies & series'
              className='bg-transparent outline-none placeholder:text-gray-300 text-white w-full'
            />
          </div>
        </form>
      )}

      {/* Search icon */}
      <button
        type='button'
        onClick={onSearchIconClick}
        className='p-2 rounded-full hover:bg-white/10 transition'
      >
        <Search size={22} color='white' />
      </button>

      {/* Results dropdown */}
      {open && (
        <div className='absolute right-0 top-full mt-2 w-[26rem] max-h-72 overflow-auto bg-black/90 border border-gray-800 rounded-md shadow-lg z-40'>
          <div className='p-3'>
            {searching ? (
              <div className='text-gray-300'>Searching…</div>
            ) : results.length > 0 ? (
              results.slice(0, 10).map((r) => (
                <div
                  key={r.id + r.media_type}
                  className='py-2 px-2 hover:bg-white/5 rounded cursor-pointer'
                  onClick={() => {
                    setQuery(r.title || r.name);
                    setResults([r]);
                  }}
                >
                  <div className='text-sm text-white font-medium'>
                    {r.title || r.name}
                  </div>
                  <div className='text-xs text-gray-400 capitalize'>
                    {r.media_type}
                  </div>
                </div>
              ))
            ) : query.trim() === "" ? (
              <div className='text-gray-400'>
                Type to search movies & series
              </div>
            ) : (
              <div className='text-gray-400'>
                No results for <span className='text-white'>"{query}"</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
