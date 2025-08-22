// useCheckout.js
// Custom React hook for handling checkout process with multiple payment methods.
// - Manages checkout flow for both cash and bank (Stripe) payment methods
// - Integrates with cart store and user Firebase operations
// - Handles Stripe payment session creation and redirection
// - Provides loading states, error handling, and form validation
// - Creates orders with appropriate payment status based on method
// - Clears cart and redirects on successful cash payments

"use client";
import * as React from "react";
import useCart from "@/features/cart/store/useCart";
import { useGetUser } from "@/shared/hooks/useGetUser";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

// Initialize Stripe promise with publishable key from environment variables
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

	// Main checkout handler function - processes both cash and bank payments
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

				// Save order to Firebase and clear cart
				await updateUserOrdersInFirebase(cashOrderDetails);
				clearCart();
				router.push("/checkout/success");
			} else if (method === "bank") {
				// Stripe payment flow - create checkout session
				const stripe = await stripePromise;

				if (!stripe) {
					throw new Error("Stripe failed to load");
				}

				// Create Stripe checkout session via API route
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

				// Redirect to Stripe checkout page
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
