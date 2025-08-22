// SecondBanner.jsx
// Section showing promotional banners (e.g., Sneakers & Motorcycles)
// - Uses <BannerItem /> for each banner
// - Responsive grid: single column on mobile → 2 columns on larger screens


import * as React from "react";
import BannerItem from "./BannerItem";

const banners = [
	{
		image: "/assets/shoes.webp",
		title: "Step Into Style",
		description: "Discover our latest collection of high-performance sneakers.",
		link: "/category/mens-shoes",
		buttonText: "Shop Now",
	},
	{
		image: "/assets/motorcycle.webp",
		title: "Ride in Style",
		description: "Experience the thrill of the road with our latest motorcycles.",
		link: "/category/motorcycle",
		buttonText: "Explore Now",
	},
];

const SecondBanner = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 my-8">
			{banners.map((item, idx) => (
				<BannerItem key={idx} banner={item} />
			))}
		</div>
	);
};

export default SecondBanner;