import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export default function SkeletonCard() {
	return (
		<Card className="p-2 flex flex-col rounded border-none shadow-none gap-0">
			{/* Header */}
			<CardHeader className="bg-[#f5f5f5] pt-5 relative">
				<CardTitle>
					<Skeleton className="w-10 h-4 rounded-full" />
				</CardTitle>
				<div className="absolute right-2 top-2 flex flex-col gap-3 items-center">
					<Skeleton className="w-4 h-4 rounded-full" />
					<Skeleton className="w-4 h-4 rounded-full" />
				</div>
			</CardHeader>

			{/* Image */}
			<CardContent className="overflow-hidden relative bg-[#f5f5f5] mb-5">
				<Skeleton className="w-40 h-40 mx-auto mb-2 rounded" />
				<Skeleton className="w-full h-8 absolute bottom-0 left-0" />
			</CardContent>

			{/* Footer */}
			<CardFooter className="flex flex-col justify-start gap-4">
				<Skeleton className="w-3/4 h-4" />
				<div className="flex items-center gap-x-1.5 w-full">
					<Skeleton className="w-20 h-4" />
					<Skeleton className="w-10 h-4" />
				</div>
				<div className="flex items-center gap-2 w-full">
					<Skeleton className="w-12 h-4" />
					<Skeleton className="w-12 h-4" />
				</div>
			</CardFooter>
		</Card>
	);
}
