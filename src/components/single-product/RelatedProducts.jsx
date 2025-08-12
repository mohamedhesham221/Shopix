"use client";
import * as React from "react";
import useFetchCategoryProducts from "@/hooks/useFetchCategoryProducts";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import ProductCard from "../ProductCard";
import SlideIn from "@/animations/SlideIn";
import Autoplay from "embla-carousel-autoplay";
import SkeletonCard from "../SkeletonCard";

const RelatedProducts = ({ product }) => {
	const productCategory = product?.category ?? "";
	const { products, isLoading } = useFetchCategoryProducts(productCategory);
	const collection = React.useMemo(() => {
		if (!products || products.length === 0) return [];

		const currentId = String(product?.id ?? "");

		return products.filter((item) => {
			const itemId = item && typeof item === "object" ? item.id : item;
			return String(itemId ?? "") !== currentId;
		});
	}, [products, product?.id]);

	return (
		<>
			<div className="my-10 px-20  lg:px-40 ">
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
							? Array.from({ length: 4 }).map((_, index) => (
									<CarouselItem
										key={`skeleton-${index}`}
										className="basis-full sm:basis-1/3 lg:basis-1/4"
									>
										<SkeletonCard />
									</CarouselItem>
							  ))
							: collection?.map((product, index) => (
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
				</Carousel>
			</div>
		</>
	);
};

export default RelatedProducts;
