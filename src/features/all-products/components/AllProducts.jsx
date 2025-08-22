// AllProducts.jsx
// Paginated products listing component with infinite scroll functionality and filtering.
// - Implements "Load More" pagination pattern fetching 12 products at a time
// - Accumulates products in state to create infinite scroll experience
// - Provides client-side filtering by rating and price range on accumulated products
// - Uses sorting functionality with custom sort keys
// - Displays skeleton loading placeholders during initial load
// - Shows loading spinner during additional product fetches
// - Integrates FilterProducts sidebar for user controls and responsive grid layout
// - Prevents unnecessary API calls when all products have been loaded

"use client";
import * as React from "react";
import { Loader2Icon } from "lucide-react";
import ProductCard from "@/shared/components/ProductCard";
import SkeletonCard from "@/shared/components/SkeletonCard";
import { Button } from "@/shared/ui/button";
import FilterProducts from "@/shared/components/FilterProducts";
import useSort from "@/shared/hooks/useSort";
import useFilter from "@/shared/hooks/useFilter";
import { useFetchProducts } from "@/features/all-products/hooks/useFetchProducts";

const AllProducts = () => {
		// Pagination configuration - fixed limit of 12 products per request
	const [limit] = React.useState(12);
	// Current offset for pagination
	const [skip, setSkip] = React.useState(0);
	const [currentProducts, setCurrentProducts] = React.useState([]);

		// Fetch products with current pagination parameters
	const { products, isLoading, total } = useFetchProducts(limit, skip);
	const [ratingFilter, setRatingFilter] = React.useState("all");
	const [priceRange, setPriceRange] = React.useState([0, 50000]);

		// Apply filters to accumulated products (not just current batch)
	const filteredProducts = useFilter(currentProducts, ratingFilter, priceRange);
	const { sortedProducts, setSortKey } = useSort(filteredProducts);

		// Effect to accumulate products when new batch is fetched
	React.useEffect(() => {
		if (products && products.length > 0) {
			setCurrentProducts((prev) => [...prev, ...products]);
		}
	}, [products]);

		// Load more products function - updates skip to fetch next batch
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
