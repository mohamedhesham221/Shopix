// components/navbar/CartIcon.jsx
"use client";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import useCart from "@/store/useCart";
export function CartIcon({ itemCount = 0 }) {
	const {cart} = useCart()
	return (
		<div className="relative cursor-pointer">
			<Link href="/cart">
				<ShoppingCart className="w-6 h-6" />
			</Link>
			{cart.length> 0 && (
				<Badge
					className="h-5 min-w-5 rounded-full px-1 font-roboto tabular-nums absolute -top-3 -right-2 bg-green-500"
					size="sm"
				>
					{cart.length}
				</Badge>
			)}
		</div>
	);
}
