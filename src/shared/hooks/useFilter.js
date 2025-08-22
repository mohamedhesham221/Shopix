// File: useFilter.js
// Purpose: Custom React hook to filter products by rating range and price range
// Notes: Returns a filtered list of products based on provided criteria

import { useMemo } from "react";

export default function useFilter(
  products = [],
  ratingFilter = "all",
  priceRange = [0, Infinity] // min, max
) {
  // Memoized filtered products to avoid unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      const rating = Number(product.rating) || 0;
      const price = Number(product.price) || 0;
      // Check if product matches rating filter
      const matchRating =
        ratingFilter === "all"
          ? true
          : (() => {
            const [minRating, maxRating] = ratingFilter
              .split("-")
              .map(Number);
            return rating >= minRating && rating <= maxRating;
          })();

          // Check if product matches price filter
      const matchPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchRating && matchPrice;
    });
  }, [products, ratingFilter, priceRange]);

  return filteredProducts;
}
