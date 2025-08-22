// BreadcrumbNavigate.jsx
// This component is responsible for rendering a breadcrumb navigation bar.
// It helps users understand their current location in the app and navigate back easily.

import * as React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
	BreadcrumbList,
} from "@/shared/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import { formatText } from "@/core/utils/helpers";
const BreadcrumbNavigate = ({ category = "category" }) => {
	return (
		<>
			{/* Main breadcrumb container */}
			<Breadcrumb className="ml-14 md:ml-32 mt-16">
				<BreadcrumbList>
					{/* First breadcrumb item -> Home link */}
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{/* Separator between items */}
					<BreadcrumbSeparator>
						<SlashIcon />
					</BreadcrumbSeparator>
					{/* Current page breadcrumb (active, styled differently) */}
					<BreadcrumbItem>
						<BreadcrumbPage className="text-red font-bold capitalize">
							{formatText(category)}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</>
	);
};

export default BreadcrumbNavigate;
