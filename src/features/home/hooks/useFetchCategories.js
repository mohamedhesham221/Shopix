// hooks/useFetchCategories.js
// Custom hook to fetch and organize product categories from API
// - Fetches categories with React Query (caching & stale times)
// - Normalizes raw categories into structured groups (men, women, electronics, etc.)
// - Provides utility filter function for keyword-based grouping
// - Returns structured categories, loading, and error states

"use client";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/core/api/httpClient";
import { API_ENDPOINTS } from "@/core/services/apiRoutes";

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
  // Utility function to filter categories by keywords and optional exclusions
  const filterBy = (keywords, exclude = []) =>
    categories?.filter(
      (cat) =>
        keywords.some((k) => cat.includes(k)) &&
        !exclude.some((e) => cat.includes(e))
    ) || [];

  // Organize categories into grouped structure
  const categoriesData = React.useMemo(() => {
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