import * as React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
	BreadcrumbList,
} from "./ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import { formatText } from "@/utils/helpers";
const BreadcrumbNavigate = ({ category = "category" }) => {
	return (
		<>
			<Breadcrumb className="ml-14 md:ml-32 mt-16">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<SlashIcon />
					</BreadcrumbSeparator>
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
