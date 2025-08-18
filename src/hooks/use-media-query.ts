"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Set initial state to match the query if in browser, or undefined during SSR
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);

      // Set the initial value (redundant but safe)
      setMatches(media.matches);

      // Define a callback function to handle changes
      const listener = () => setMatches(media.matches);

      // Add the listener
      media.addEventListener("change", listener);

      // Remove the listener on cleanup
      return () => media.removeEventListener("change", listener);
    }

    // Return empty function for SSR
    return () => {};
  }, [query]);

  return matches;
}
