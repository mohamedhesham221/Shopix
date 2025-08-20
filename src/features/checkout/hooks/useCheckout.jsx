"use client";
import * as React from "react";
import useCart from "@/features/cart/store/useCart";
import { useGetUser } from "@/shared/hooks/useGetUser";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const useCheckout = () => {
	const { cart, getTotalPrice, clearCart } = useCart();
	const { updateUserOrdersInFirebase, updateUserCartInFirebase } = useGetUser();
	const [method, setMethod] = React.useState("cash");
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const router = useRouter();

	const handleCheckout = async (formData) => {
		try {
			setIsLoading(true);
			setError(null);

			// Validate cart
			if (!cart || cart.length === 0) {
				throw new Error("Cart is empty");
			}

			if (method === "cash") {
				// For cash payments, create order with pending status
				const cashOrderDetails = {
					...formData,
					paymentMethod: "cash",
					paymentStatus: "pending",
					items: cart,
					totalAmount: getTotalPrice(),
					createdAt: new Date().toISOString(),
				};

				await updateUserOrdersInFirebase(cashOrderDetails);
				clearCart();
				router.push("/checkout/success");
			} else if (method === "bank") {
				const stripe = await stripePromise;

				if (!stripe) {
					throw new Error("Stripe failed to load");
				}

				const res = await fetch("/api/checkout_sessions", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						cart,
						formData,
					}),
				});

				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(
						errorData.error || "Failed to create checkout session"
					);
				}

				const data = await res.json();

				if (!data.id) {
					throw new Error("No session ID returned");
				}

				const result = await stripe.redirectToCheckout({ sessionId: data.id });

				if (result.error) {
					throw new Error(result.error.message);
				}
			}
		} catch (err) {
			console.error("Checkout error:", err);
			setError(err.message);
		} finally {
			setIsLoading(false);
			console.log("Checkout process completed");
		}
	};

	const resetError = () => setError(null);

	return {
		handleCheckout,
		method,
		setMethod,
		cart,
		getTotalPrice,
		clearCart,
		updateUserOrdersInFirebase,
		isLoading,
		error,
		resetError,
	};
};

export default useCheckout;
