"use client";
import { Skeleton } from "@/shared/ui/skeleton";
import { Button } from "@/shared/ui/button";
import {
	Truck,
	ShieldCheck,
	RefreshCcw,
	PlusIcon,
	MinusIcon,
	Heart,
} from "lucide-react";
import useCart from "@/features/cart/store/useCart";
import * as React from "react";
import useWishlist from "@/features/wishlist/store/useWishlist";
import { useUser, useClerk } from "@clerk/nextjs";

const initialCounter = { quantity: 0 };
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

export default function ProductActions({ product, isLoading }) {
	const { cart, addToCart, updateQuantity } = useCart();
	const [count, dispatch] = React.useReducer(reducer, initialCounter);
	const { addToWishlist } = useWishlist();
	const { isSignedIn } = useUser();
	const { redirectToSignIn } = useClerk();

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
		<>
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

						{/* Add to Cart */}
						<Button
							className="flex-1 h-12 text-sm sm:text-base font-medium bg-red cursor-pointer"
							onClick={handleAddOrUpdate}
							disabled={count.quantity === 0}
						>
							Add to Cart
						</Button>

						{/* Wishlist */}
						<Button
							variant="outline"
							size="icon"
							className="h-12 w-12 shrink-0 bg-transparent cursor-pointer"
							onClick={() => {
								if (isSignedIn) {
									addToWishlist(product.id);
								} else {
									redirectToSignIn();
								}
							}}
						>
							<Heart size={18} />
							<span className="sr-only">Add to wishlist</span>
						</Button>
					</>
				)}
			</div>

			{/* Service Information */}
			<div className="grid grid-cols-1 lg:grid-cols-3 border rounded-lg divide-y sm:divide-y-0 sm:divide-x divide-border mt-4">
				{isLoading ? (
					Array.from({ length: 3 }).map((_, idx) => (
						<Skeleton className="h-20" key={idx} />
					))
				) : (
					<>
						<div className="flex items-center gap-3 p-4">
							<Truck size={20} className="text-muted-foreground shrink-0" />
							<div>
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
							<div>
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
							<div>
								<p className="font-inter font-medium text-sm">Return Policy</p>
								<p className="font-roboto text-xs text-muted-foreground leading-tight">
									{product.returnPolicy}
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
