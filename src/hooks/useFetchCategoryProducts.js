import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/httpClient";
import { API_ENDPOINTS } from '@/services/apiRoutes'

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