// HeroSlide.jsx
// Hero section carousel for the homepage
// - Uses embla-carousel with autoplay + Framer Motion for animations
// - Displays promotional slides with background image, overlay, and CTA button
// - Responsive design with hidden navigation on mobile

"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/ui/carousel";
import { Button } from "../../../shared/ui/button";
import TextFade from "@/shared/animations/TextFade";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
const sliderData = [
	{
		image: "/assets/laptop-slide.webp",
		title: "Top Tech Deals",
		description: "Explore unbeatable prices on laptops and smart devices",
		price: "Starting at $499",
		cta: "Shop Now",
	},
	{
		image: "/assets/furniture-slide.webp",
		title: "Style Your Space",
		description: "Modern furniture to refresh every room in your home",
		price: "Starting at $699",
		cta: "Shop Now",
	},
	{
		image: "/assets/groceries-slide.webp",
		title: "Daily Essentials",
		description: "Fresh groceries and pantry items at great prices",
		price: "Starting at $2.99",
		cta: "Shop Now",
	},
	{
		image: "/assets/mobiles-slide.webp",
		title: "Latest Smartphones",
		description: "Smartphone deals with advanced features and sleek designs",
		price: "Starting at $299",
		cta: "Shop Now",
	},
	{
		image: "/assets/womens-bags-slide.webp",
		title: "Fashion & Accessories",
		description: "Trending bags and stylish picks for every occasion",
		price: "Starting at $49",
		cta: "Shop Now",
	},
	{
		image: "/assets/fragrances-slide.webp",
		title: "Fragrances You'll Love",
		description: "Signature scents that last all day",
		price: "Starting at $129",
		cta: "Shop Now",
	},
];

const HeroSlide = () => {
	const [hovered, setHovered] = React.useState(false);

	return (
		<>
			<Carousel
				opts={{
					align: "start",
					loop: true,
					containSnap: "keepSnaps",
				}}
				plugins={[
					Autoplay({
						delay: 5000,
						stopOnInteraction: false,
						stopOnMouseEnter: true,
						resetProgress: true,
					}),
				]}
			>
				<CarouselContent>
					{sliderData.map((slide, index) => (
						<CarouselItem
							key={index}
							className="relative w-full h-64 lg:h-[500px] bg-black overflow-hidden"
							style={{ position: "relative" }}
						>
							{/* Background Image */}
							<div
								className="absolute inset-0 bg-cover bg-center"
								style={{ backgroundImage: `url("${slide.image}")` }}
								aria-label={`Slide ${index + 1}`}
							/>

							{/* Optional Overlay */}
							<div className="absolute inset-0 bg-black/60" />

							{/* Text Content */}
							<div className="absolute top-15 lg:top-40 left-6 md:left-1/5 text-white z-10 px-5 md:px-15 lg:px-20">
								<TextFade>
									<h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-2 font-inter">
										{slide.title}
									</h2>
									<p className="text-sm md:text-base lg:text-lg mb-3 text-secondary">
										{slide.description}
									</p>
									<p className="text-base md:text-lg lg:text-xl font-semibold mb-4">
										{slide.price}
									</p>

									<Button
										onMouseEnter={() => setHovered(true)}
										onMouseLeave={() => setHovered(false)}
										variant={"ghost"}
										asChild
										className="relative bg-transparent text-white p-0 transition-all duration-300 ease-in-out w-24 text-xs lg:w-32 lg:text-base rounded-none border-0 cursor-pointer hover:bg-transparent hover:text-inherit justify-between"
									>
										<Link href="/products">
											{slide.cta}
											<motion.span
												animate={{ x: hovered ? -15 : -20 }}
												transition={{ duration: 0.3 }}
												className="inline-block"
											>
												<ArrowRight className="self-start" />
											</motion.span>
										</Link>
									</Button>
								</TextFade>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/60 hover:bg-white/90 text-black p-2 rounded-full shadow-md cursor-pointer" />
				<CarouselNext className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/60 hover:bg-white/90 text-black p-2 rounded-full shadow-md cursor-pointer" />
			</Carousel>
		</>
	);
};

export default HeroSlide;
