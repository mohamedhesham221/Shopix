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
