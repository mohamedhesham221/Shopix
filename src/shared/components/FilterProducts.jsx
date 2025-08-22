// components/FilterProducts.jsx
// Purpose: This component provides UI filters for products,
// including sorting, rating filter, and price range filter.

import * as React from "react";
import { StarIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import Slider from "rc-slider";
import { Separator } from "@/shared/ui/separator";
const FilterProducts = ({
	setSortKey,
	setRatingFilter,
	priceRange,
	setPriceRange,
}) => {
	// Predefined rating filter options
	const ratings = [
		{ value: "all", stars: 0, label: "All" },
		{ value: "0-2", stars: 2 },
		{ value: "2-4", stars: 4 },
		{ value: "4-5", stars: 5 },
	];

	return (
		<>
			{/* Section: Sorting options */}

			<p className="font-inter text-red text-xl font-semibold mb-5">Filters:</p>
			<Select onValueChange={(value) => setSortKey(value)}>
				<SelectTrigger className="w-full md:w-[200px] cursor-pointer font-inter">
					<SelectValue placeholder="Sorting" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Sort By</SelectLabel>
						<SelectItem value="a-z">A to Z</SelectItem>
						<SelectItem value="z-a">Z to A</SelectItem>
						<SelectItem value="lowest">Lowest price</SelectItem>
						<SelectItem value="greatest">Highest price</SelectItem>
						<SelectItem value="lowest-rating">Lowest rating</SelectItem>
						<SelectItem value="greatest-rating">Highest rating</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Separator
				orientation="horizontal"
				className="w-full md:w-[200px] my-8"
			/>
			{/* Section: Rating filter */}
			<p className="font-inter text-gray text-sm font-semibold mb-5">
				Rating filter
			</p>
			<RadioGroup
				defaultValue="all"
				onValueChange={(value) => setRatingFilter(value)}
			>
				{ratings.map((rating, idx) => (
					<div key={rating.value} className="flex items-center gap-3">
						<RadioGroupItem value={rating.value} id={`r${idx + 1}`} />
						<Label htmlFor={`r${idx + 1}`}>
							{rating.stars > 0 ? (
								<span className="flex">
									{Array.from({ length: rating.stars }).map((_, starIdx) => (
										<StarIcon key={starIdx} className="w-5 text-amber-500" />
									))}
								</span>
							) : (
								rating.label
							)}
						</Label>
					</div>
				))}
			</RadioGroup>
			<Separator
				orientation="horizontal"
				className="w-full md:w-[200px] my-8"
			/>
			{/* Section: Price range filter using slider */}
			<p className="font-inter text-gray text-sm font-semibold mb-5">
				Pricing filter
			</p>
			<Slider
				range
				min={0}
				max={50000}
				step={10}
				defaultValue={priceRange}
				onChange={(value) => setPriceRange(value)}
				styles={{
					track: { backgroundColor: "#DB4444" },
					handle: { borderColor: "#DB4444" },
					rail: { backgroundColor: "#ddd" },
				}}
			/>
			<p className="flex flex-row justify-between items-center">
				{priceRange.map((n, idx) => {
					return <span key={idx}>{n}</span>;
				})}
			</p>
		</>
	);
};

export default FilterProducts;
