import { useEffect } from "react";

export function useInfiniteScroll(ref, callback, loading) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          callback();
        }
      },
      { threshold: 1 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, callback, loading]);
}
