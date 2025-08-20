import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from "@/core/services/apiRoutes";

const fetchSingleProduct = async (id) => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCT_BY_ID(id))
  return data;
}
export const useFetchSingleProduct = (id) => {
  const { data: product, isLoading } = useQuery({
    queryKey: [`Product-${id}`],
    queryFn: () => fetchSingleProduct(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  })
  return {
    product,
    isLoading
  };

}