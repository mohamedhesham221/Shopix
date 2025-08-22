// FeaturedProducts.jsx
// Section showcasing top-rated products in a responsive carousel
// - Fetches products via useFetchProducts hook
// - Filters products with rating > 4.9
// - Uses embla-carousel with autoplay
// - Displays SkeletonCard while loading
// - Animates product cards with SlideIn

"use client";
import * as React from "react";
import { useFetchProducts } from "@/features/all-products/hooks/useFetchProducts";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui/carousel";
import ProductCard from "@/shared/components/ProductCard";
import SlideIn from "@/shared/animations/SlideIn";
import TextFade from "@/shared/animations/TextFade";
import Autoplay from "embla-carousel-autoplay";
import SkeletonCard from "../../../shared/components/SkeletonCard";
const FeaturedProducts = () => {
	const { products, isLoading } = useFetchProducts();

	const popularProducts = React.useMemo(() => {
		if (products?.length === 0) return [];
		return products?.filter((product) => product.rating > "4.9") || [];
	}, [products]);

	return (
		<>
			<section className="w-full px-5 md:px-10 lg:px-40 mt-10 relative">
				<TextFade>
					<h2 className="relative text-sm font-bold mb-1 text-red header-mark">
						Featured
					</h2>
					<p className="text-sm text-primary font-bold font-inter mt-5 md:text-xl lg:text-3xl">
						Top Rating
					</p>
				</TextFade>
				<div className="my-20">
					<Carousel
						opts={{
							loop: true,
							align: "start",
						}}
						plugins={[
							Autoplay({
								delay: 100000,
							}),
						]}
					>
						<CarouselContent>
							{isLoading
								? Array.from({ length: 8 }).map((_, index) => (
										<CarouselItem
											key={`skeleton-${index}`}
											className="basis-full sm:basis-1/3 lg:basis-1/4"
										>
											<SkeletonCard />
										</CarouselItem>
								  ))
								: popularProducts.map((product, index) => (
										<CarouselItem
											key={`${product.id}-${index}`}
											className="basis-full sm:basis-1/3 lg:basis-1/4"
										>
											<SlideIn index={index}>
												<ProductCard product={product} />
											</SlideIn>
										</CarouselItem>
								  ))}
						</CarouselContent>
						<CarouselPrevious className={"hidden lg:flex cursor-pointer"} />
						<CarouselNext className={"hidden lg:flex cursor-pointer"} />
					</Carousel>
				</div>
			</section>
		</>
	);
};

export default FeaturedProducts;
