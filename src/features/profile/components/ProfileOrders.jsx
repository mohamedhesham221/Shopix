"use client";
import * as React from "react";
import { useFetchOrders } from "@/features/profile/hooks/useGetOrders";
import { Card, CardContent } from "@/shared/ui/card";
import { Loader2 } from "lucide-react";
import { Package } from "lucide-react";
import ProfileOrderCard from "./ProfileOrderCard";
const ProfileOrders = () => {
	const { orders, isLoading, isError } = useFetchOrders();
	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-10">
				<Loader2 className="h-6 w-6 animate-spin text-gray-500" />
			</div>
		);
	}
	if (isError) {
		return (
			<div className="p-4 border border-red-300 bg-red-50 rounded-lg text-red-700">
				Failed to load orders. Please try again later.
			</div>
		);
	}
	if (orders.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-10 text-center">
				<Package className="h-10 w-10 text-gray-400 mb-3" />
				<p className="text-gray-600 dark:text-gray-300 font-roboto">
					You don’t have any orders yet.
				</p>
			</div>
		);
	}
	return (
		<Card>
			<CardContent className="p-6">
				<h2 className="text-xl font-semibold mb-4 font-roboto">My Orders</h2>
				<div className="space-y-4">
					{orders.map((order) => (
						<ProfileOrderCard key={order?.orderId} order={order} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileOrders;
