"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../shared/ui/button";
import { AspectRatio } from "../../../shared/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";

const BannerItem = ({ banner }) => {
	const [hovered, setHovered] = React.useState(false);

	return (
		<>
			<div className="relative group overflow-hidden rounded-lg shadow-md h-100vh cursor-pointer">
				{/* Image */}
				<AspectRatio ratio={16 / 9} className="w-full h-full">
					<Image
						src={banner.image}
						alt={banner.title}
						fill
						sizes="(max-width: 640px) 100vw, 50vw"
						className="object-cover transition-transform duration-500 group-hover:scale-110"
					/>
				</AspectRatio>

				{/* Desktop Overlay - Hidden by default, shown on hover */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileHover={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="hidden lg:flex absolute inset-0 bg-black/60 text-white p-6 flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				>
					<h3 className="text-xl md:text-3xl font-semibold mb-2 font-inter self-start text-start">
						{banner.title}
					</h3>
					<p className="text-sm mb-4 md:text-xl self-start text-start">
						{banner.description}
					</p>

					<Link
						href={banner.link}
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						className="bg-transparent text-whitetransition rounded-none flex items-center justify-center self-start gap-3 text-xl hover:bg-transparent"
					>
						{banner.buttonText}
						<motion.span
							animate={{ x: hovered ? 20 : 10 }}
							transition={{ duration: 0.3 }}
							className="inline-block"
						>
							<ArrowRight className="self-start" />
						</motion.span>
					</Link>
				</motion.div>

				{/* Mobile Overlay - Always visible */}
				<div className="flex lg:hidden absolute inset-0 bg-black/60 text-white p-6 flex-col justify-center items-center text-center">
					<h3 className="text-base md:text-2xl font-semibold mb-2 font-inter self-start text-start">
						{banner.title}
					</h3>
					<p className="text-xs md:text-sm mb-4 self-start text-start">
						{banner.description}
					</p>
					<Link
						href={banner.link}
						className="bg-transparent text-white hover:bg-gray-300 transition rounded-none flex items-center justify-center self-start gap-3 text-sm"
					>
						{banner.buttonText}
						<ArrowRight className="w-4" />
					</Link>
				</div>
			</div>
		</>
	);
};

export default BannerItem;
