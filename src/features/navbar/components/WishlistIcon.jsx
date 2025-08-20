// components/navbar/WishlistIcon.jsx
import { Badge } from "@/shared/ui/badge";
import { Heart } from "lucide-react";
import Link from "next/link";

export function WishlistIcon({ itemCount = 0 }) {
	return (
		<div className="relative">
			<Link href="/wishlist">
				<Heart className="w-6 h-6 text-gray-700 transition-colors cursor-pointer" />
				{itemCount > 0 && (
					<Badge
						className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 -right-2"
						size="sm"
						variant="destructive"
					>
						{itemCount}
					</Badge>
				)}
			</Link>
		</div>
	);
}
