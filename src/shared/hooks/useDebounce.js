// File: useDebounce.js
// Purpose: Custom React hook to debounce a value (e.g., search input) by delaying updates
// Notes: Returns the debounced value after the specified delay (default: 500ms)

import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
