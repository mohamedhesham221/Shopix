// BrandSlider.jsx
// Carousel section to showcase featured brands
// - Uses static brands array with logo images
// - Animates logos with SlideIn
// - Embla Carousel with autoplay (3s delay)
// - Responsive: 1 per slide on mobile, 3 on tablet, 4 on desktop

"use client";

import * as React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui/carousel";
import SlideIn from "@/shared/animations/SlideIn";
import Autoplay from "embla-carousel-autoplay";

const brands = [
	{
		title: "Apple",
		image: "/assets/brands/apple-logo.png",
	},
	{
		title: "HP",
		image: "/assets/brands/HP-logo.png",
	},
	{
		title: "Nike",
		image: "/assets/brands/nike.png",
	},
	{
		title: "Zara",
		image: "/assets/brands/zara.png",
	},
	{
		title: "Polo",
		image: "/assets/brands/polo.png",
	},
	{
		title: "Samsung",
		image: "/assets/brands/samsung-logo.png",
	},
	{
		title: "Rayban",
		image: "/assets/brands/rayban.png",
	},
	{
		title: "Rolex",
		image: "/assets/brands/rolex.png",
	},
];
const BrandSlider = () => {
	return (
		<>
			<section className="w-full px-5 md:px-10 lg:px-40 mt-10 relative">
				<h2 className="text-xl md:text-2xl font-bold text-center">
					Featured Brands
				</h2>
				<div className="mt-15">
					<Carousel
						className="w-full"
						opts={{
							loop: true,
							align: "start",
						}}
						plugins={[
							Autoplay({
								delay: 3000,
							}),
						]}
					>
						<CarouselContent className="flex justify-between items-center">
							{brands.map((brand, index) => (
								<CarouselItem
									key={index}
									className="basis-full sm:basis-1/3 lg:basis-1/4"
								>
									<SlideIn index={index} isOnce={false}>
										<img
											src={brand.image}
											alt={brand.title}
											loading="lazy"
											className="h-16 w-auto object-contain mx-auto"
										/>
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

export default BrandSlider;
