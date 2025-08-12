// components/navbar/Navbar.jsx (Main component)
"use client";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { WishlistIcon } from "./WishlistIcon";
import { UserDropdown } from "./UserDropdown";
import useCreateUser from '@/hooks/useCreateUser';
import useCart from "@/store/useCart";
import useWishlist from "@/store/useWishlist";

export default function Navbar() {
  useCreateUser()

	const { getTotalProducts } = useCart();
	const { getTotalItems } = useWishlist();
	return (
		<header className="sticky top-0 md:z-[9999] z-50 bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Mobile Menu */}
				<MobileMenu />

				{/* Logo */}
				<Logo />

				{/* Desktop Search */}
				<SearchBar className="hidden md:flex flex-1 mx-6 max-w-md" />

				{/* Right section */}
				<div className="flex items-center gap-4">
					<CartIcon itemCount={getTotalProducts.length} />
					<WishlistIcon itemCount={getTotalItems.length} />
					<UserDropdown />
				</div>
			</div>

			{/* Mobile Search */}
			<SearchBar className="block md:hidden px-4 pb-3" />
		</header>
	);
}
