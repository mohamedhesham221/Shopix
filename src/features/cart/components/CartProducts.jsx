// components/cart/CartProducts.jsx
"use client";
import * as React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";
import useCart from "@/features/cart/store/useCart";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import {
	ChevronDown,
	ChevronUp,
	Trash2,
	ShoppingCart,
	Loader2,
} from "lucide-react";
import CartTotalPrice from "./CartTotalPrice";
import { useGetUser } from "@/shared/hooks/useGetUser";

const CartProducts = () => {
	const { USER_ID, userDB } = useGetUser();
	const {
		cart,
		incrementQuantity,
		decrementQuantity,
		removeFromCart,
		clearCart,
		isHydrated,
	} = useCart();

	if (!cart || cart.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center gap-2 text-center py-10">
				<ShoppingCart className="h-12 w-12 text-gray-400" />
				<p className="text-primary font-bold text-2xl font-inter">
					Cart is empty!
				</p>
			</div>
		);
	}


	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-inter">Product</TableHead>
						<TableHead className="font-inter">Price</TableHead>
						<TableHead className="font-inter">Quantity</TableHead>
						<TableHead className="text-right font-inter">Subtotal</TableHead>
						<TableHead className="font-inter">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{cart.map((item) => (
						<TableRow key={item.id}>
							{/* Product Info */}
							<TableCell className="font-medium flex items-center gap-3 min-w-[200px] font-roboto cursor-pointer">
								<Image
									src={item.img}
									alt={item.title}
									width={80}
									height={80}
									className="rounded-md border shrink-0"
								/>
								<p className="flex-1 break-words line-clamp-2 text-sm">
									{item.title}
								</p>
							</TableCell>

							{/* Price */}
							<TableCell className="font-roboto">${item.price}</TableCell>

							{/* Quantity Controls */}
							<TableCell>
								<div className="flex items-center gap-2 border rounded-md px-2 py-1 w-fit">
									<span className="min-w-[30px] text-center font-medium font-roboto">
										{item.quantity}
									</span>

									<div className="flex flex-col">
										<Button
											variant="ghost"
											size="icon"
											className="h-4 w-4 p-0 cursor-pointer"
											onClick={() => incrementQuantity(item.id)}
										>
											<ChevronUp className="h-3 w-3" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-4 w-4 p-0 cursor-pointer"
											onClick={() => decrementQuantity(item.id)}
										>
											<ChevronDown className="h-3 w-3" />
										</Button>
									</div>
								</div>
							</TableCell>

							{/* Subtotal */}
							<TableCell className="text-right font-medium font-roboto">
								${(item.price * item.quantity).toFixed(2)}
							</TableCell>

							{/* Delete Action */}
							<TableCell>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 p-0 cursor-pointer justify-end hover:bg-transparent"
									onClick={() => removeFromCart(item.id)}
								>
									<Trash2 className="h-4 w-4 text-red-600" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="flex flex-col-reverse md:flex-row gap-3 justify-between items-stretch mt-6">
				<CartTotalPrice />
				<Button
					className="w-full md:w-[120px] bg-red rounded-none cursor-pointer font-roboto disabled:opacity-50"
					onClick={clearCart}
				>
					Clear Cart
				</Button>
			</div>
		</div>
	);
};

export default CartProducts;
