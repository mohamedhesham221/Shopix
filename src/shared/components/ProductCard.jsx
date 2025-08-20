"use client";
import * as React from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Eye, Heart, ShoppingCart, Trash } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import useCart from "@/features/cart/store/useCart";
import { Button } from "@/shared/ui/button";
import useWishlist from "@/features/wishlist/store/useWishlist";
import { useUser, useClerk } from "@clerk/nextjs";

const myStyles = {
	itemShapes: Star,
	activeFillColor: "#facc15",
	inactiveFillColor: "#d1d5db",
};

const ProductCard = ({ product, loading, inWishlist = false }) => {
	const oldPrice =
		product.price +
		product.price * (Math.floor(product.discountPercentage) / 100);
	const { addToCart } = useCart();
	const { addToWishlist, removeFromWishlist } = useWishlist();
	const { isSignedIn } = useUser();
	const { openSignIn } = useClerk();
	return (
		<>
			<Card
				className={
					"p-2 flex flex-col rounded border-none shadow-none group cursor-pointer gap-0"
				}
			>
				<CardHeader className="bg-[#f5f5f5] pt-5">
					{product.discountPercentage && (
						<CardTitle>
							<Badge className="bg-red text-white px-2 py-0.5 rounded-full text-xs shadow">
								-{product.discountPercentage}%
							</Badge>
						</CardTitle>
					)}
					<CardAction
						className={"flex flex-col justify-center gap-3 items-center"}
					>
						{!inWishlist ? (
							<>
								<Link href={`/products/${product.id}`}>
									<Eye className="w-4 h-4 cursor-pointer hover:text-hover-red" />
								</Link>
								<Button
									size="icon"
									variant="ghost"
									className="cursor-pointer hover:text-hover-red w-fit items-stretch"
									onClick={() => {
										if (isSignedIn) {
											addToWishlist(product.id);
										} else {
											openSignIn();
										}
									}}
								>
									<Heart className="w-4 h-4" />
								</Button>
							</>
						) : (
							<Button
								size="icon"
								variant="ghost"
								className="cursor-pointer text-red hover:text-hover-red w-fit items-stretch"
								onClick={() => removeFromWishlist(product.id)}
							>
								<Trash />
							</Button>
						)}
					</CardAction>
				</CardHeader>
				<CardContent className="overflow-y-hidden relative bg-[#f5f5f5] mb-5">
					<Image
						src={product.thumbnail}
						alt={product.title}
						width={100}
						height={100}
						className="w-30 h-30 mb-2 rounded object-cover mx-auto group-hover:scale-95 transition-all"
					/>
					<motion.button
						initial={{ y: 100 }}
						animate={{ y: 0 }}
						transition={{ duration: 0.3 }}
						whileHover={{ y: 0 }}
						className="hidden lg:flex items-center justify-center gap-2 bg-black text-white cursor-pointer absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-all font-roboto"
						onClick={() => {
							addToCart({
								id: product.id,
								title: product.title,
								img: product.thumbnail,
								price: Number(product.price),
								quantity: 1,
							});
							if (inWishlist) removeFromWishlist(product.id);
						}}
					>
						<ShoppingCart size={20} /> Add To Cart
					</motion.button>
					<Button
						className="flex items-center justify-center gap-2 lg:hidden text-center bg-black text-white cursor-pointer font-roboto py-1.5 absolute bottom-0 left-0 right-0 rounded-none"
						onClick={() => {
							addToCart({
								id: product.id,
								title: product.title,
								img: product.thumbnail,
								price: Number(product.price),
								quantity: 1,
							});
							removeFromWishlist(product.id);
						}}
					>
						<ShoppingCart size={20} /> Add To Cart
					</Button>
				</CardContent>
				<CardFooter className={"flex flex-col justify-start gap-4"}>
					<p className="text-start w-full font-inter">{product.title}</p>
					<div className="flex items-center gap-2 w-full">
						<span className="text-red font-bold">
							${Number(product.price).toFixed(2)}
						</span>
						{product.discountPercentage && (
							<span className="text-muted-foreground line-through text-sm">
								${oldPrice.toFixed(2)}
							</span>
						)}
					</div>
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

export default ProductCard;
