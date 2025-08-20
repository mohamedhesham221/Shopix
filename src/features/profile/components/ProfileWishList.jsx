"use client";
import SkeletonCard from "@/shared/components/SkeletonCard";
import SlideIn from "@/shared/animations/SlideIn";
import { useFetchWishlistProduct } from "@/features/wishlist/hooks/useFetchWishlistProduct";
import * as React from "react";
import { Card, CardContent } from "@/shared/ui/card";
import { Heart } from "lucide-react";
import ProfileProductCard from "./ProfileProductCard";
const ProfileWishList = () => {
	const { products, isLoading, isError } = useFetchWishlistProduct();
	if (isLoading) {
		return (
			<SlideIn>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
					{Array.from({ length: 8 }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			</SlideIn>
		);
	}
	return (
		<>
			<Card>
				<CardContent className="p-6">
					<h2 className="text-xl font-semibold mb-4 font-roboto">Wishlist ({products.length})</h2>
					{isError ? (
						<div className="p-4 border border-red-300 bg-red-50 rounded-lg text-red-700 font-roboto">
							Failed to load wishlist items. Please try again later.
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{products.map((product) => (
								<ProfileProductCard key={product.id} product={product} />
							))}
						</div>
					)}
					{products.length === 0 && !isLoading && !isError && (
						<div className="flex flex-col items-center justify-center py-10 text-center">
							<Heart className="h-10 w-10 text-gray-400 mb-3" />
							<p className="text-gray-600 dark:text-gray-300 font-roboto">
								Your wishlist is empty. Start exploring and add items you love
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default ProfileWishList;
