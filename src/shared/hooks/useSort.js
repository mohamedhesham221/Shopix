import { useMemo, useState } from "react";

export default function useSort(products = []) {
  const [sortKey, setSortKey] = useState("");

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
        return sortedArr;
    }
  }, [products, sortKey]);

  return { sortedProducts, sortKey, setSortKey };
}
