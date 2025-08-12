"use client";
import * as React from "react";
import useFetchCategoryProducts from "@/hooks/useFetchCategoryProducts";
import ProductCard from "../ProductCard";
import SkeletonCard from "../SkeletonCard";
import { motion, AnimatePresence } from "framer-motion";
import FilterProducts from "../FilterProducts";
import useSort from "@/hooks/useSort";
import useFilter from "@/hooks/useFilter";
const Products = ({ category }) => {
	const { products, isLoading, isError } = useFetchCategoryProducts(category);
	const categoryProducts = React.useMemo(() => {
		if (products?.length === 0) return [];
		return products || [];
	}, [products]);
	const [ratingFilter, setRatingFilter] = React.useState("all");
	const [priceRange, setPriceRange] = React.useState([0, 50000]);

	const filteredProducts = useFilter(
		categoryProducts,
		ratingFilter,
		priceRange
	);
	const { sortedProducts, setSortKey } = useSort(filteredProducts);
console.log(categoryProducts);
console.log(sortedProducts);
console.log(filteredProducts);

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
