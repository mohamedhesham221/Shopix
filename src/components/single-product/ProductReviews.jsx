"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { RoundedStar } from "@smastrom/react-rating";
import { Progress } from "@/components/ui/progress";
import "@smastrom/react-rating/style.css";

const ratingStyles = {
	itemShapes: RoundedStar,
	activeFillColor: "#facc15", 
	inactiveFillColor: "#d1d5db", 
};

const ProductReviews = ({ product, isLoading }) => {
	const ratingsCount = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: product?.reviews?.filter((r) => Number(r.rating) === star).length || 0,
	}));

	const totalRatings = ratingsCount.reduce((acc, r) => acc + r.count, 0);
	const averageRating = totalRatings
  ? ratingsCount.reduce((acc, r) => acc + (r.star * r.count), 0) / totalRatings
  : 0;

	if (isLoading) {
		return (
			<div className="hidden lg:grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-5 md:px-20">
				{Array.from({ length: 3 }).map((_, idx) => (
					<Card key={idx} className="p-6 rounded-2xl shadow-sm border border-gray-100">
						<CardHeader className="flex items-center gap-4 p-0">
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="flex flex-col gap-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-20" />
							</div>
						</CardHeader>
						<CardContent className="p-0 pt-4 space-y-3">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-3 w-full" />
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	return (
		<div className="px-5 md:px-20 space-y-8">
			
			<div className="flex flex-col lg:flex-row gap-8">
			
				<div className="flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-8 shadow-lg min-w-64">
					<span className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
						{(averageRating || 0).toFixed(1)}
					</span>
					<ReactRating
						style={{ maxWidth: 130 }}
						value={Number(product?.rating) || 0}
						readOnly
						itemStyles={ratingStyles}
					/>
					<span className="text-sm text-gray-600 font-medium mt-2">
						Based on {totalRatings} reviews
					</span>
				</div>

				
				<div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
					<div className="space-y-4">
						{ratingsCount.map(({ star, count }) => {
							const percentage = totalRatings
								? (count / totalRatings) * 100
								: 0;
							return (
								<div key={star} className="flex items-center gap-4">
									<span className="w-8 text-sm font-semibold text-gray-700">{star}★</span>
									<Progress value={percentage} className="h-3 bg-gray-100 flex-1" />
									<span className="w-8 text-sm font-medium text-gray-600 text-right">{count}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{!product?.reviews || product.reviews.length === 0 ? (
					<p className="text-muted-foreground col-span-full text-center py-12">No reviews yet.</p>
				) : (
					product.reviews.map((review, idx) => (
						<Card
							key={idx}
							className="p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 bg-white"
						>
							<CardHeader className="flex items-center gap-4 p-0 mb-4">
								<Avatar className="h-12 w-12">
									<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
										{review.reviewerName
											.split(" ")
											.map((n) => n[0])
											.join("")
											.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col flex-1">
									<span className="font-semibold text-gray-900">{review.reviewerName}</span>
									<span className="text-xs text-gray-500">
										{review.reviewerEmail}
									</span>
									<span className="text-xs text-gray-500">
										{new Date(review.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</div>
							</CardHeader>

							<CardContent className="p-0 space-y-3">
								<ReactRating
									style={{ maxWidth: 110 }}
									value={Number(review.rating)}
									readOnly
									itemStyles={ratingStyles}
								/>
								<p className="text-sm text-gray-700 leading-relaxed">
									{review.comment}
								</p>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
};

export default ProductReviews;