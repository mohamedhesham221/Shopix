"use client";
import * as React from "react";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import Image from "next/image";
const myStyles = {
	itemShapes: Star,
	activeFillColor: "#facc15",
	inactiveFillColor: "#d1d5db",
};

const ProfileProductCard = ({ product }) => {
	return (
		<>
			<Card
				className={
					"p-2 flex flex-col rounded border-none shadow-none group cursor-pointer gap-0"
				}
			>
				<CardContent className="overflow-y-hidden relative bg-[#f5f5f5] mb-5">
					<Image
						src={product.thumbnail}
						alt={product.title}
						width={100}
						height={100}
						className="w-30 h-30 mb-2 rounded object-cover mx-auto group-hover:scale-95 transition-all"
					/>
				</CardContent>
				<CardFooter className={"flex flex-col justify-start gap-4"}>
					<p className="text-start w-full font-inter">{product.title}</p>
					<div className="flex items-center gap-x-1.5 w-full">
						<ReactRating
							style={{ maxWidth: 100 }}
							value={Number(product.rating)}
							readOnly
							halfFillMode="svg"
							itemStyles={myStyles}
						/>
						<p className="text-muted-foreground">({product.reviews.length})</p>
					</div>
				</CardFooter>
			</Card>
		</>
	);
};

export default ProfileProductCard;
