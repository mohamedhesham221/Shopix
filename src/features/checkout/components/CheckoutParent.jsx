// CheckoutParent.jsx
// Main checkout page container component that orchestrates the checkout process.
// - Manages state and logic through useCheckout custom hook
// - Renders customer details form and order summary side by side
// - Handles responsive layout with flex direction changes (vertical on mobile, horizontal on desktop)
// - Passes down checkout functions and state to child components
// - Integrates ClientDetailsForm for customer information and BuyingItems for cart summary/payment
// - Provides error handling and loading states throughout the checkout flow

"use client";
import * as React from "react";
import BuyingItems from "@/features/checkout/components/BuyingItems";
import ClientDetailsForm from "@/features/checkout/components/ClientDetailsForm";
import useCheckout from "../hooks/useCheckout";

const CheckoutParent = () => {
	const {
		cart,
		getTotalPrice,
		handleCheckout,
		setMethod,
		isLoading,
    error,
    resetError
	} = useCheckout();

	return (
		<>
			<div className="flex flex-col md:flex-row gap-10 lg:gap-20">
				<ClientDetailsForm
					handleCheckout={handleCheckout}
				/>
				<BuyingItems
					cart={cart}
					getTotalPrice={getTotalPrice}
					setMethod={setMethod}
					isLoading={isLoading}
					error={error}
					resetError={resetError}
				/>
			</div>
		</>
	);
};

export default CheckoutParent;
