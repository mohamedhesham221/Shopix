// apiRoutes.js
// Centralized API endpoints configuration for DummyJSON service.
// - Defines base URL for all requests.
// - Provides dynamic endpoints for products, categories, product details, category-based products, and search.
// - Helps maintain consistency and reusability across the app’s data-fetching logic.

const Base_URL = 'https://dummyjson.com';

export const API_ENDPOINTS = {
  PRODUCTS: (limit,skip) => `${Base_URL}/products?limit=${limit}&skip=${skip}`, // Paginated products
  CATEGORIES: `${Base_URL}/products/category-list`,  // All categories
  PRODUCT_BY_ID: (id) => `${Base_URL}/products/${id}`, // Single product details
  CATEGORY_PRODUCTS: (category) => `${Base_URL}/products/category/${category}`, // Products by category
  SEARCH_PRODUCTS: (q) => `${Base_URL}/products/search?q=${q}&select=title,thumbnail` // Search products (title & thumbnail only)
}