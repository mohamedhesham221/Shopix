"use client";
import * as React from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { Skeleton } from "../ui/skeleton";
import ProductCard from "../ProductCard";
import SlideIn from "@/animations/SlideIn";
import TextFade from "@/animations/TextFade";
import Link from "next/link";
import { Button } from "../ui/button";
import SkeletonCard from "../SkeletonCard";
const AllProductsSection = () => {
	const { products, isLoading } = useFetchProducts();
	const allProducts = React.useMemo(() => {
		if (products?.length === 0) return [];
		return products?.filter(el => el.category === "mens-shirts" || el.category === "tablets") || [];
	}, [products]);
	return (
		<>
			<section className="w-full px-5 md:px-10 lg:px-40 mt-10 relative">
				<TextFade>
					<h2 className="relative text-sm font-bold mb-1 header-mark text-red">
						Products
					</h2>
					<p className="text-sm text-primary font-bold font-inter mt-5 md:text-xl lg:text-3xl">
						Explore Our Products
					</p>
				</TextFade>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-20">
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => (
								<SkeletonCard key={index} />
						  ))
						: allProducts.map((product, index) => (
								<SlideIn key={`${product.id}-${index}`} index={index}>
									<ProductCard product={product} />
								</SlideIn>
						  ))}
				</div>
				<Button
					asChild
					variant="outline"
					className="block mt-8 w-fit mx-auto bg-red text-secondary"
				>
					<Link href="/products" className="">
						View Our Products
					</Link>
				</Button>
			</section>
		</>
	);
};

export default AllProductsSection;
