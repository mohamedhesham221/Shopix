import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Send } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

const accountLinks = [
	{ name: "Profile", href: "/profile" },
	{ name: "Cart", href: "/cart" },
	{ name: "Wishlist", href: "/wishlist" },
];
const support = [
	{ name: "Giza, Egypt" },
	{ name: "01234567890" },
	{ name: "shopix@gmail.com" },
];
const socialLinks = [
	{ name: "Facebook", icon: <FaFacebookF />, href: "https://www.facebook.com" },
	{
		name: "Instagram",
		icon: <FaInstagram />,
		href: "https://www.instagram.com",
	},
	{ name: "Twitter", icon: <BsTwitterX />, href: "https://www.twitter.com" },
	{ name: "YouTube", icon: <FaYoutube />, href: "https://www.youtube.com" },
];
export default function Footer() {
	return (
		<footer className="bg-black text-gray-100 py-10 mt-12 lg:px-25">
			<div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
				{/* Column 1: Project + Subscribe */}
				<div>
					<h2 className="text-xl font-bold mb-4">Shopix</h2>
					<p className="mb-2">Subscribe</p>
					<p className="mb-2"> Get 15% Off Your First Order</p>
					<div className="relative w-full max-w-sm">
						<Input type="email" placeholder="Your email" className="pr-12" />
						<Button
							size="icon"
							variant="default"
							className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent cursor-pointer hover:bg-transparent"
						>
							<Send className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Column 2: Support */}
				<div>
					<h3 className="text-lg font-semibold mb-4">Support</h3>
					{support.map((item, index) => (
						<p key={index} className="mb-2">
							{item.name}
						</p>
					))}
				</div>

				{/* Column 3: Account Links */}
				<div>
					<h3 className="text-lg font-semibold mb-4">Account</h3>
					<ul className="space-y-2">
						{accountLinks.map((link, index) => (
							<li key={index}>
								<Link href={link.href} className="hover:underline">
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Column 4: Social Media */}
				<div className="self-center">
					<h3 className="text-lg font-semibold mb-4">Follow Us</h3>
					<div className="flex gap-4">
						{socialLinks.map((social, index) => (
							<Link
								key={index}
								href={social.href}
								className="text-gray-400 hover:text-white transition-colors"
								target="_blank"
							>
								{social.icon}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="text-center text-sm text-gray-500 mt-10">
				&copy; {new Date().getFullYear()} Shopix. All rights reserved.
			</div>
		</footer>
	);
}
