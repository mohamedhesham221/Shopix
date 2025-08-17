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
const CategoriesMobile = () => {
	const { categoriesData, isLoading } = useFetchCategories();
	const keys = Object.entries(categoriesData);
	return (
		<>
			<NavigationMenu
				viewport={false}
				className={`w-full py-5 flex md:hidden items-start`}
			>
				<NavigationMenuList className="flex-col items-start">
					{keys?.map(([categoryName, categoryItems], idx) => {
						return (
							<NavigationMenuItem key={idx}>
								<NavigationMenuTrigger className="capitalize">
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
															className="capitalize"
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

export default CategoriesMobile;
