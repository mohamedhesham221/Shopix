// useFetchOrders.jsx
// Custom React hook to fetch user orders from Firestore
// - Uses Clerk's authenticated user ID to locate Firestore document
// - Fetches "orders" array from user doc and keeps it in local state
// - Handles loading, error, and empty states gracefully

"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/core/lib/firebase"; // firebase config
import { useUser } from "@clerk/nextjs";

export function useFetchOrders() {
	const { user } = useUser();
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!user) return;

		const fetchOrders = async () => {
			try {
				setIsLoading(true);

				const userRef = doc(db, "users", user.id);
				const snapshot = await getDoc(userRef);

				if (snapshot.exists()) {
					const data = snapshot.data();
					setOrders(data.orders || []);
				} else {
					setOrders([]);
				}
			} catch (error) {
				console.error("Error fetching orders:", error);
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrders();
	}, [user]);
	useEffect(() => {
		console.log("Orders updated:", orders);
	}, [orders]);

	return { orders, isLoading, isError };
}
