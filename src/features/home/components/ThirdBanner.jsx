// ThirdBanner.jsx
// Banner section displaying multiple promotional items in a responsive grid
// - Uses `BannerItem` component to render each banner card
// - Content (image, title, description, link, button) is defined in a local array
// - Grid layout adapts: 1 column (mobile) → 2 columns (sm+ screens)

import * as React from "react";
import BannerItem from "./BannerItem";
const banners = [
	{
		image: "/assets/sunglass.webp",
		title: "Shades That Shine",
		description: "Explore our stylish sunglasses for every season.",
		link: "/category/sunglasses",
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
