"use client";
// components/navbar/SearchBar.jsx
import { Input } from "@/shared/ui/input";
import ImageWithFallback from "@/core/utils/ImageFallback";
import * as React from "react";
import { useSearchProducts } from "../hooks/useSearchProducts";
import Link from "next/link";
export function SearchBar({ className }) {
	// State to hold the search query
	const [searchQuery, setSearchQuery] = React.useState("");
	// Function to handle changes in the search input
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};
	// Use the custom hook to fetch and filter products based on the search query
	const { products, isLoading, isError } = useSearchProducts(searchQuery);
	return (
		<div className={className}>
			<div className="relative w-full">
				<Input
					type="search"
					placeholder="Search products..."
					className="pr-10"
					onChange={handleSearchChange}
				/>
				{(searchQuery || searchQuery.length > 0) && (
					<div className="absolute z-50 right-0 left-0 w-full text-gray-700 border rounded-md bg-white shadow-lg max-h-72 overflow-y-auto">
						{isLoading ? (
							<div className="flex justify-center items-center py-6">
								<div className="w-6 h-6 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
							</div>
						) : (
							products &&
							products.length > 0 && (
								<ul>
									{products.map((product) => (
										<li
											className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
											key={product.id}
										>
											<Link
												href={`products/${product.id}`}
												className="flex gap-2 items-center"
											>
												<ImageWithFallback
													src={product.thumbnail}
													alt={product.title}
													width={40}
													height={40}
													className="w-10 h-10 object-cover rounded"
												/>
												<span className="whitespace-nowrap text-ellipsis overflow-hidden">
													{product.title}
												</span>
											</Link>
										</li>
									))}
								</ul>
							)
						)}
						{products?.length === 0 && (
							<p className="text-center text-gray-500 text-sm p-2">
								No results found for {searchQuery}.
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
