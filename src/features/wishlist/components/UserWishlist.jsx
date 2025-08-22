// UserWishlist.jsx
// Client component to render user's wishlist page
// - Fetches wishlist products using custom React Query hook
// - Displays loading skeletons, error state, or empty state when applicable
// - Animates product cards with SlideIn and shows total wishlist count

"use client";
import * as React from "react";
import SkeletonCard from "@/shared/components/SkeletonCard";
import SlideIn from "@/shared/animations/SlideIn";
import ProductCard from "@/shared/components/ProductCard";
import { useFetchWishlistProduct } from "@/features/wishlist/hooks/useFetchWishlistProduct";

const UserWishlist = () => {
	const { products, isLoading, isError } = useFetchWishlistProduct();

	// Show loading state during fetch or hydration
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		);
	}

	// Handle error state
	if (isError) {
		return (
			<div className="flex flex-col justify-center items-center gap-2 text-center py-10">
				<p className="text-red-500 font-bold text-2xl font-inter">
					Failed to load wishlist
				</p>
				<p className="text-gray-600">Please try again later</p>
			</div>
		);
	}

	// Show empty state
	if (!products?.length) {
		return (
			<div className="flex flex-col justify-center items-center gap-2 text-center py-10">
				<p className="text-primary font-bold text-2xl font-inter">
					Wishlist is empty!
				</p>
				<p className="text-gray-600">Add some products to your wishlist</p>
			</div>
		);
	}

	return (
		<>
			<h1 className="text-red flex justify-start items-center gap-2 text-center py-5 font-bold text-2xl font-inter">
				Wishlist ({products.length})
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products.map((product, index) => (
					<SlideIn key={`${product.id}-${index}`} index={index}>
						<ProductCard product={product} inWishlist={true} />
					</SlideIn>
				))}
			</div>
		</>
	);
};

export default UserWishlist;
