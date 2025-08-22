// Products.jsx
// Main products listing component with filtering, sorting, and animations.
// - Fetches products for specific category using React Query
// - Implements client-side filtering by rating and price range
// - Provides sorting functionality with custom sort keys
// - Uses Framer Motion for smooth entry/exit animations and layout transitions
// - Displays skeleton loading placeholders during data fetch
// - Responsive grid layout that adapts from 1 to 4 columns based on screen size
// - Integrates FilterProducts sidebar for user controls and ProductCard for item display

"use client";
import * as React from "react";
import useFetchCategoryProducts from "@/features/category/hooks/useFetchCategoryProducts";
import ProductCard from "@/shared/components/ProductCard";
import SkeletonCard from "@/shared/components/SkeletonCard";
import { motion, AnimatePresence } from "framer-motion";
import FilterProducts from "@/shared/components/FilterProducts";
import useSort from "@/shared/hooks/useSort";
import useFilter from "@/shared/hooks/useFilter";
const Products = ({ category }) => {
		// Fetch products for the specified category with loading and error states
	const { products, isLoading, isError } = useFetchCategoryProducts(category);
		// Memoized products array to prevent unnecessary re-renders
	const categoryProducts = React.useMemo(() => {
		if (products?.length === 0) return [];
		return products || [];
	}, [products]);
		// Filter state management
	const [ratingFilter, setRatingFilter] = React.useState("all");
	const [priceRange, setPriceRange] = React.useState([0, 50000]);

		// Apply filters to products based on rating and price range
	const filteredProducts = useFilter(
		categoryProducts,
		ratingFilter,
		priceRange
	);
		// Apply sorting to filtered products and get sort control function
	const { sortedProducts, setSortKey } = useSort(filteredProducts);

	return (
		<>
			<div className="flex flex-col md:flex-row px-5 md:px-10 ">
				<div className="my-20">
					<FilterProducts
						setSortKey={setSortKey}
						setRatingFilter={setRatingFilter}
						priceRange={priceRange}
						setPriceRange={setPriceRange}
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 my-20 md:mx-10 md:border-l md:pl-5">
					{isLoading ? (
						Array.from({ length: 20 }).map((_, index) => (
							<SkeletonCard key={`skeleton-${index}`} className="p-4" />
						))
					) : (
						<AnimatePresence>
							{sortedProducts.map((product, index) => (
								<motion.div
									key={`${product.id}-${index}`}
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
								>
									<ProductCard product={product} index={index} />
								</motion.div>
							))}
						</AnimatePresence>
					)}
				</div>
			</div>
		</>
	);
};

export default Products;
