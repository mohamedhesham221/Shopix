// File: useSort.js
// Purpose: Custom React hook to handle product sorting by title, price, or rating
// Notes: Returns sorted product list along with the current sort key and setter function

import { useMemo, useState } from "react";

export default function useSort(products = []) {
    // State to hold the current sort key (e.g., "a-z", "lowest", "greatest-rating")
  const [sortKey, setSortKey] = useState("");

    // Memoized sorted array to avoid unnecessary recalculations
  const sortedProducts = useMemo(() => {
    let sortedArr = [...products];

    switch (sortKey) {
      case "a-z":
        return sortedArr.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return sortedArr.sort((a, b) => b.title.localeCompare(a.title));
      case "lowest":
        return sortedArr.sort((a, b) => a.price - b.price);
      case "greatest":
        return sortedArr.sort((a, b) => b.price - a.price);
      case "lowest-rating":
        return sortedArr.sort((a, b) => Number(a.rating) - Number(b.rating));
      case "greatest-rating":
        return sortedArr.sort((a, b) => Number(b.rating) - Number(a.rating));
      default:
        return sortedArr; // If no sortKey, return original order
    }
  }, [products, sortKey]);

  return { sortedProducts, sortKey, setSortKey };
}
