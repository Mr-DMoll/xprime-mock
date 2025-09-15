import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        // TMDB puts movies/tv in `results`, but genres in `genres`
        setData(json.results || json.genres || []);
      } catch (e) {
        console.error("Fetch error:", e);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);

  return { data, loading };
}
