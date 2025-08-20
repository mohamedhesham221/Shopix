"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from "@/core/services/apiRoutes";
import useDebounce from "@/shared/hooks/useDebounce";
const fetchSearchedProducts = async (q) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.SEARCH_PRODUCTS(q))
  return data.products
}

export const useSearchProducts = (searchQuery) => {
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