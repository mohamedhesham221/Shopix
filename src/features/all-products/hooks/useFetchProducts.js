// useFetchProducts.js
// Custom React Query hook for fetching paginated products from the API.
// - Fetches products with optional limit and skip parameters for pagination
// - Implements caching with 5-minute stale time and 10-minute cache time
// - Returns products array, total count, and loading state for UI handling
// - Uses centralized API client and endpoint configuration
// - Supports default parameters (limit=0, skip=0) for flexible usage
// - Optimizes performance with React Query's built-in caching and background refetching
// - Query key includes pagination parameters to ensure proper cache segregation

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from "@/core/services/apiRoutes";

// API function to fetch products with pagination parameters
const fetchProducts = async (limit, skip) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCTS(limit, skip))
  return data;
}
export const useFetchProducts = (limit = 0, skip = 0) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => fetchProducts(limit, skip),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    products: data?.products,
    total: data?.total,
    isLoading
  };
}