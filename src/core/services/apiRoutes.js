const Base_URL = 'https://dummyjson.com';

export const API_ENDPOINTS = {
  PRODUCTS: (limit,skip) => `${Base_URL}/products?limit=${limit}&skip=${skip}`,
  CATEGORIES: `${Base_URL}/products/category-list`,
  PRODUCT_BY_ID: (id) => `${Base_URL}/products/${id}`,
  CATEGORY_PRODUCTS: (category) => `${Base_URL}/products/category/${category}`,
  SEARCH_PRODUCTS: (q) => `${Base_URL}/products/search?q=${q}&select=title,thumbnail`
}