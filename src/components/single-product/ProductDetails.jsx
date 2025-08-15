"use client";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import { Badge } from "@/components/ui/badge";
import {
	Barcode,
	Ruler,
	Truck,
	RefreshCcw,
	ShieldCheck,
	Store,
	PlusIcon,
	MinusIcon,
	Heart,
} from "lucide-react";
import { Button } from "../ui/button";
import useCart from "@/store/useCart";
import * as React from "react";

const ratingStyles = {
	itemShapes: Star,
	activeFillColor: "#facc15",
	inactiveFillColor: "#d1d5db",
};
const initialCounter = {
	quantity: 0,
};
const reducer = (state, action) => {
	switch (action.type) {
		case "INCREMENT":
			return { quantity: state.quantity + 1 };
		case "DECREMENT":
			return { quantity: Math.max(state.quantity - 1, 0) };
		case "SET":
			return { quantity: action.payload };
		default:
			return state;
	}
};
const ProductDetails = ({ product, isLoading }) => {
	const oldPrice = (price, discount) => {
		const beforeDiscountPrice = price + price * (discount / 100);
		return beforeDiscountPrice.toFixed(2);
	};
	const { cart, addToCart, updateQuantity } = useCart();

	const [count, dispatch] = React.useReducer(reducer, initialCounter);
	React.useEffect(() => {
		const existing = cart.find((i) => i.id === product?.id);
		dispatch({ type: "SET", payload: existing ? existing.quantity : 0 });
	}, [product?.id, cart]);

	const handleAddOrUpdate = () => {
		const exists = cart.some((item) => item.id === product.id);
		!exists
			? addToCart({
					id: product.id,
					title: product.title,
					img: product.thumbnail,
					price: Number(product.price),
					quantity: count.quantity,
			  })
			: updateQuantity(product.id, count.quantity);
	};
	return (
		<section className=" flex flex-col gap-y-4 md:gap-y-6 justify-start w-full md:w-1/2 max-w-full">
			{/* Product Title */}
			{isLoading ? (
				<Skeleton className="w-full h-6 md:h-8" />
			) : (
				<h2 className="font-inter text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight">
					{product.title}
				</h2>
			)}

			{/* Rating and Reviews Section */}
			<div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 items-start sm:items-center">
				<div className="flex items-center gap-x-2">
					{isLoading ? (
						<Skeleton className="w-24 h-5" />
					) : (
						<ReactRating
							style={{ maxWidth: 100 }}
							value={Number(product.rating)}
							readOnly
							halfFillMode="svg"
							itemStyles={ratingStyles}
						/>
					)}
				</div>

				<div className="flex items-center">
					{isLoading ? (
						<Skeleton className="w-20 h-5" />
					) : (
						<p className="text-muted-foreground font-roboto text-sm">
							({product.reviews.length} Reviews)
						</p>
					)}
				</div>

				<Separator orientation="vertical" className="hidden sm:block h-5" />

				<div className="flex items-center">
					{isLoading ? (
						<Skeleton className="w-24 h-5" />
					) : (
						<p className="font-roboto text-sm">
							<span className="text-green-600 font-medium">
								{product.availabilityStatus}
							</span>{" "}
							<span className="text-muted-foreground text-xs">
								({product.stock} in stock)
							</span>
						</p>
					)}
				</div>
			</div>

			{/* Tags */}
			<div className="flex flex-wrap gap-2">
				{isLoading
					? Array.from({ length: 3 }).map((_, idx) => (
							<Skeleton className="w-16 h-6" key={idx} />
					  ))
					: product.tags.map((tag, idx) => (
							<Badge
								variant="outline"
								key={idx}
								className="capitalize font-roboto text-xs"
							>
								{tag}
							</Badge>
					  ))}
			</div>

			{/* Price Section */}
			{isLoading ? (
				<Skeleton className="w-40 h-8" />
			) : (
				<div className="flex flex-wrap gap-3 items-baseline">
					<span className="font-inter font-bold text-2xl sm:text-3xl text-foreground">
						${product.price.toFixed(2)}
					</span>
					{product.discountPercentage && (
						<>
							<span className="text-muted-foreground line-through text-lg font-roboto">
								${oldPrice(product.price, product.discountPercentage)}
							</span>
							<Badge variant="destructive" className="text-xs">
								{product.discountPercentage}% OFF
							</Badge>
						</>
					)}
				</div>
			)}

			{/* Description */}
			{isLoading ? (
				<div className="space-y-2">
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-3/4 h-4" />
				</div>
			) : (
				<p className="text-sm sm:text-base font-roboto leading-relaxed text-muted-foreground">
					{product.description}
				</p>
			)}

			<Separator className="my-2" />

			{/* Brand and SKU */}
			<div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-start">
				{isLoading ? (
					<>
						<Skeleton className="w-32 h-5" />
						<Skeleton className="w-24 h-6" />
					</>
				) : (
					<>
						{product.brand && (
							<p className="font-inter flex items-center gap-2 text-sm">
								<Store size={16} className="text-muted-foreground" />
								<span className="font-medium">{product.brand}</span>
							</p>
						)}
						<Badge
							variant="secondary"
							className="font-roboto flex items-center gap-2 text-xs"
						>
							<Barcode size={14} /> {product.sku}
						</Badge>
					</>
				)}
			</div>

			{/* Dimensions */}
			{isLoading ? (
				<Skeleton className="w-full h-5" />
			) : (
				<div className="font-roboto flex flex-wrap items-center gap-2 text-sm">
					<div className="flex items-center gap-2">
						<Ruler size={16} className="text-muted-foreground" />
						<span className="font-medium">Dimensions:</span>
					</div>
					<div className="flex flex-wrap gap-3 text-xs">
						<span className="bg-muted px-2 py-1 rounded">
							W: {product.dimensions.width}"
						</span>
						<span className="bg-muted px-2 py-1 rounded">
							H: {product.dimensions.height}"
						</span>
						<span className="bg-muted px-2 py-1 rounded">
							D: {product.dimensions.depth}"
						</span>
					</div>
				</div>
			)}

			{/* Action Buttons */}
			<div className="flex flex-wrap gap-3 w-full mt-4">
				{isLoading ? (
					<>
						<Skeleton className="w-full sm:w-32 h-12" />
						<Skeleton className="flex-1 h-12" />
						<Skeleton className="w-full sm:w-12 h-12" />
					</>
				) : (
					<>
						{/* Quantity Selector */}
						<div className="border border-input rounded-md flex w-full sm:w-auto min-w-[120px] grow">
							<Button
								variant="ghost"
								size="sm"
								className="rounded-none border-r border-input px-3 h-12 cursor-pointer"
								onClick={() => dispatch({ type: "DECREMENT" })}
							>
								<MinusIcon size={16} />
							</Button>
							<div className="flex-1 flex items-center justify-center min-w-[40px] text-sm font-medium">
								{count.quantity}
							</div>
							<Button
								variant="ghost"
								size="sm"
								className="rounded-none border-l border-input px-3 h-12 cursor-pointer"
								onClick={() => dispatch({ type: "INCREMENT" })}
							>
								<PlusIcon size={16} />
							</Button>
						</div>

						{/* Buy Now Button */}
						<Button
							className="flex-1 h-12 text-sm sm:text-base font-medium bg-red cursor-pointer"
							onClick={handleAddOrUpdate}
							disabled={count.quantity === 0}
						>
							Add to Cart
						</Button>

						{/* Wishlist Button */}
						<Button
							variant="outline"
							size="icon"
							className="h-12 w-12 shrink-0 bg-transparent cursor-pointer"
						>
							<Heart size={18} />
							<span className="sr-only">Add to wishlist</span>
						</Button>
					</>
				)}
			</div>

			{/* Service Information */}
			<div className="grid grid-cols-1  lg:grid-cols-3 border rounded-lg divide-y sm:divide-y-0 sm:divide-x divide-border mt-4">
				{isLoading ? (
					Array.from({ length: 3 }).map((_, idx) => (
						<Skeleton className="h-20" key={idx} />
					))
				) : (
					<>
						<div className="flex items-center gap-3 p-4">
							<Truck size={20} className="text-muted-foreground shrink-0" />
							<div className="min-w-0">
								<p className="font-inter font-medium text-sm">Delivery</p>
								<p className="font-roboto text-xs text-muted-foreground leading-tight">
									{product.shippingInformation}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 p-4">
							<ShieldCheck
								size={20}
								className="text-muted-foreground shrink-0"
							/>
							<div className="min-w-0">
								<p className="font-inter font-medium text-sm">Warranty</p>
								<p className="font-roboto text-xs text-muted-foreground leading-tight">
									{product.warrantyInformation}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 p-4">
							<RefreshCcw
								size={20}
								className="text-muted-foreground shrink-0"
							/>
							<div className="min-w-0">
								<p className="font-inter font-medium text-sm">Return Policy</p>
								<p className="font-roboto text-xs text-muted-foreground leading-tight">
									{product.returnPolicy}
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default ProductDetails;
