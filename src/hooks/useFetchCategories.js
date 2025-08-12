"use client";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/httpClient";
import { API_ENDPOINTS } from "@/services/apiRoutes";

const fetchCategories = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
  return data;
};
export function useFetchCategories() {
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  const initialStructure = {
    men: [],
    women: [],
    electronics: [],
    home: [],
    beauty: [],
    accessories: [],
    groceries: [],
    vehicles: []
  }
  const filterBy = (keywords, exclude = []) =>
    categories?.filter(
      (cat) =>
        keywords.some((k) => cat.includes(k)) &&
        !exclude.some((e) => cat.includes(e))
    ) || [];

    const categoriesData =React.useMemo(() => {
      if (!categories?.length) return initialStructure;
      return {
        women: filterBy(["women", "tops"], ["laptops"]),
        men: filterBy(["men"], ["women"]),
        electronics: filterBy(["smartphones", "laptops", "tablets"]),
        home: filterBy(["furniture", "home-decoration"]),
        beauty: filterBy(["beauty", "fragrances", "skin-care"]),
        accessories: filterBy(["accessories", "sunglasses"]),
        groceries: filterBy(["groceries"]),
        vehicles: filterBy(["vehicle", "motorcycle"]),
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);
  
  return { categoriesData, isLoading, isError, categories };
}