// useFetchWishlistProduct.js
// Custom hook to fetch wishlist products from API using React Query
// Maps over wishlist IDs and triggers parallel queries with caching & stale times

import * as React from "react";
import useWishlist from "@/features/wishlist/store/useWishlist";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from "@/core/services/apiRoutes";
import { useQueries } from "@tanstack/react-query";

// Fetch product by ID from backend API
const handleRequest = async (id) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return data;
};

export const useFetchWishlistProduct = () => {
  const { wishlist } = useWishlist();
  // Run multiple queries in parallel, one for each wishlist product ID
  const results = useQueries({
    queries: wishlist.map((id) => ({
      queryKey: ["Product", id],
      queryFn: () => handleRequest(id),
      staleTime: 1000 * 60 * 5,  // 5 min
      cacheTime: 1000 * 60 * 10, // 10 min
      enabled: !!id,
    })),
  });

  // Derived states
  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  // Extract successfully fetched products only
  const products = results.map((r) => r.data).filter(Boolean);

  return { products, isLoading, isError };
}

