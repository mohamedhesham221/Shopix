"use client";
import * as React from "react";
import { Loader2Icon } from "lucide-react";
import ProductCard from "../ProductCard";
import SkeletonCard from "../SkeletonCard";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import FilterProducts from "../FilterProducts";
import useSort from "@/hooks/useSort";
import useFilter from "@/hooks/useFilter";
import { useFetchProducts } from "@/hooks/useFetchProducts";

const AllProducts = () => {
	const [limit] = React.useState(12);
	const [skip, setSkip] = React.useState(0);
	const [currentProducts, setCurrentProducts] = React.useState([]);

	const { products, isLoading, total } = useFetchProducts(limit, skip);
	const [ratingFilter, setRatingFilter] = React.useState("all");
	const [priceRange, setPriceRange] = React.useState([0, 50000]);

	const filteredProducts = useFilter(currentProducts, ratingFilter, priceRange);
	const { sortedProducts, setSortKey } = useSort(filteredProducts);

	React.useEffect(() => {
		if (products && products.length > 0) {
			setCurrentProducts((prev) => [...prev, ...products]);
		}
	}, [products]);

	const loadMore = () => {
		if (skip + limit >= total) return;
		setSkip((prev) => prev + limit);
	};

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
					{isLoading && currentProducts.length === 0
						? Array.from({ length: 20 }).map((_, index) => (
								<SkeletonCard key={`skeleton-${index}`} className="p-4" />
						  ))
						: sortedProducts.map((product, index) => (
								<div key={`${product.id}-${index}`}>
									<ProductCard product={product} index={index} />
								</div>
						  ))}
				</div>
			</div>
			{products?.length > 0 && skip + limit < total && (
				<Button
					className="block mx-auto bg-red cursor-pointer hover:bg-accent-foreground disabled:opacity-50"
					onClick={loadMore}
					disabled={isLoading}
				>
					Load More
				</Button>
			)}

			{isLoading && (
				<Button size="sm" disabled className="flex mx-auto mt-2">
					<Loader2Icon className="animate-spin mr-2" />
					Please wait
				</Button>
			)}
		</>
	);
};

export default AllProducts;
