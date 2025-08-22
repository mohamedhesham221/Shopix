// useSearchProducts.js
// Custom React Query hook to search products via API
// - Debounces the search input to reduce API calls
// - Fetches products from backend search endpoint
// - Uses query caching & stale times for better performance

"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from "@/core/services/apiRoutes";
import useDebounce from "@/shared/hooks/useDebounce";


// Fetcher function that hits the search API
const fetchSearchedProducts = async (q) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.SEARCH_PRODUCTS(q))
  return data.products
}

export const useSearchProducts = (searchQuery) => {
  // Hook to search products with debounce + caching
  const debounceSearch = useDebounce(searchQuery)
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['searched-products', debounceSearch],
    queryFn: () => fetchSearchedProducts(debounceSearch),
    enabled: !!debounceSearch,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 15,
  })
  return {
    products,
    isLoading,
    isError
  }
}