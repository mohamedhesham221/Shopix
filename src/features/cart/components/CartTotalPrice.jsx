import * as React from "react";
import useCart from "@/features/cart/store/useCart";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { SHIPPING_COST } from "@/core/services/constants";

const CartTotalPrice = () => {
	const { getTotalPrice } = useCart();
	return (
		<>
			<div className="w-full max-w-sm border border-black rounded shadow-sm p-4 bg-white">
				<h2 className="text-lg font-semibold mb-4">Cart Total</h2>

				<ul className="flex flex-col divide-y">
					<li className="flex justify-between py-2 text-sm">
						<span className="text-muted-foreground">Subtotal:</span>
						<span className="font-medium">${getTotalPrice().toFixed(2)}</span>
					</li>

					<li className="flex justify-between py-2 text-sm">
						<span className="text-muted-foreground">Shipping:</span>
						<span className="font-medium">
							{SHIPPING_COST === 0 ? "Free" : `$${SHIPPING_COST.toFixed(2)}`}
						</span>
					</li>

					<li className="flex justify-between py-2 font-semibold text-base">
						<span>Total:</span>
						<span>${(getTotalPrice() + SHIPPING_COST).toFixed(2)}</span>
					</li>
				</ul>

				<Button
					asChild
					className="w-full mt-4 bg-red hover:bg-red-600 text-white cursor-pointer rounded-none"
				>
					<Link href="./checkout">Proceed to Checkout</Link>
				</Button>
			</div>
		</>
	);
};

export default CartTotalPrice;
