import { useMemo } from "react";

export default function useFilter(
  products = [],
  ratingFilter = "all",
  priceRange = [0, Infinity] // min, max
) {
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      const rating = Number(product.rating) || 0;
      const price = Number(product.price) || 0;
      console.log("filter hook",products);
      
      const matchRating =
        ratingFilter === "all"
          ? true
          : (() => {
            const [minRating, maxRating] = ratingFilter
              .split("-")
              .map(Number);
            return rating >= minRating && rating <= maxRating;
          })();

      const matchPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchRating && matchPrice;
    });
  }, [products, ratingFilter, priceRange]);
  console.log("filter hook filtered products", filteredProducts);
  
  return filteredProducts;
}
