// useFetchCategoryProducts.js
// Custom React Query hook for fetching products filtered by category.
// - Fetches product data from API endpoint based on category parameter
// - Implements caching with 5-minute stale time and 10-minute cache time
// - Only executes query when category is provided (enabled condition)
// - Returns products array, loading state, and error state for UI handling
// - Uses centralized API client and endpoint configuration
// - Optimizes performance with React Query's built-in caching and background refetching

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from '@/core/services/apiRoutes'

// API function to fetch products for a specific category
const fetchCategoryProducts = async (category) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORY_PRODUCTS(category))
  return data.products
}

const useFetchCategoryProducts = (category) => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: [`${category}-products`],
    queryFn: () => fetchCategoryProducts(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  })

  return { products, isError, isLoading }
}

export default useFetchCategoryProducts