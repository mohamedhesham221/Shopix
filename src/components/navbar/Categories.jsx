"use client";
import * as React from "react";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { formatText } from "@/utils/helpers";
const Categories = () => {
	const { categoriesData, isLoading } = useFetchCategories();
	const keys = Object.entries(categoriesData);
	return (
		<>
			<NavigationMenu
				viewport={false}
				className={`w-full mx-auto py-5  hidden md:flex relative z-50`}
			>
				<NavigationMenuList className="flex-row flex-wrap">
					{keys?.map(([categoryName, categoryItems], idx) => {
						return (
							<NavigationMenuItem key={idx}>
								<NavigationMenuTrigger className="capitalize font-inter">
									{categoryName}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[200px] gap-4">
										{categoryItems?.map((cat, idx) => {
											return (
												<li key={idx}>
													<NavigationMenuLink asChild>
														<Link
															href={`/category/${cat}`}
															className="capitalize font-roboto"
														>
															{formatText(cat)}
														</Link>
													</NavigationMenuLink>
												</li>
											);
										})}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						);
					})}
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
};

export default Categories;
