import * as React from "react";
import useCart from "@/store/useCart";
import { Button } from "../ui/button";
import Link from "next/link";
const CartTotalPrice = () => {
	const SHIPPING = 0;
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
							{SHIPPING === 0 ? "Free" : `$${SHIPPING.toFixed(2)}`}
						</span>
					</li>

					<li className="flex justify-between py-2 font-semibold text-base">
						<span>Total:</span>
						<span>${(getTotalPrice() + SHIPPING).toFixed(2)}</span>
					</li>
				</ul>

				<Button asChild className="w-full mt-4 bg-red hover:bg-red-600 text-white cursor-pointer rounded-none">
					<Link href="./checkout">Proceed to Checkout</Link>
				</Button>
			</div>
		</>
	);
};

export default CartTotalPrice;
