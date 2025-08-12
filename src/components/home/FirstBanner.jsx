import * as React from "react";
import TextFade from "@/animations/TextFade";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const FirstBanner = () => {
	return (
		<>
			<div className="w-full h-80 relative overflow-hidden my-5 lg:my-10">
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url("/assets/banner-1.webp")` }}
					aria-label={"Banner Image"}
				/>

				{/* Optional Overlay */}
				<div className="absolute inset-0 bg-black/60" />
				{/* Text Content */}
				<div className="w-full flex justify-center items-center absolute top-5 lg:top-15 left-0 right-0 mx-auto text-white z-10 px-8 md:px-10 lg:px-40">
					<TextFade>
						<p className="text-green text-base [font-variant:small-caps]">
							category
						</p>
						<h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 font-inter">
							Discover Timeless Elegance
						</h2>
						<p className="text-sm md:text-base lg:text-lg my-8">
							Explore our exclusive collection of premium watches. Precision engineering, classic design, and unmatched sophistication for every occasion.
						</p>
						<p className="text-base md:text-lg lg:text-xl font-semibold mb-4"></p>
						<Button
							asChild
							className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded transition w-24 text-xs lg:w-32 lg:text-base border-0 cursor-pointer"
						>
							<Link href="category/mens-watches">Shop Now</Link>
						</Button>
					</TextFade>
				</div>
			</div>
		</>
	);
};

export default FirstBanner;
