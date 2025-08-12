// components/navbar/CartIcon.jsx
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartIcon({ itemCount = 0 }) {
	return (
		<div className="relative cursor-pointer">
			<Link href="/cart">
				<ShoppingCart className="w-6 h-6" />
			</Link>
			{itemCount > 0 && (
				<Badge
					className="h-5 min-w-5 rounded-full px-1 font-roboto tabular-nums absolute -top-3 -right-2 bg-gray"
					size="sm"
				>
					{itemCount}
				</Badge>
			)}
		</div>
	);
}
