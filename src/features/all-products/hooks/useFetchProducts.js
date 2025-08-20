import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from "@/core/services/apiRoutes";

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