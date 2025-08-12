import * as React from "react";
import BannerItem from "./BannerItem";
const banners = [
	{
		image: "/assets/sunglass.webp",
		title: "Shades That Shine",
		description: "Explore our stylish sunglasses for every season.",
		link: "/category/sungalsses",
		buttonText: "Browse Sunglasses",
	},
	{
		image: "/assets/tablet.webp",
		title: "Tablets That Do More",
		description: "Stay connected, create, and play with our latest tablets.",
		link: "/category/tablets",
		buttonText: "Browse Tablets",
	},
];

const ThirdBanner = () => {
	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 my-8 ">
				{banners.map((item, idx) => (
					<BannerItem key={idx} banner={item} />
				))}
			</div>
		</>
	);
};

export default ThirdBanner;
