"use client";
import * as React from "react";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import Image from "next/image";
import { SHIPPING_COST } from "@/core/services/constants";
const BuyingItems = ({
	cart,
	getTotalPrice,
	setMethod,
	isLoading,
	error,
	resetErrors,
}) => {
	return (
		<>
			<div className="w-full md:w-1/2 flex flex-col gap-6">
				<div className="flex flex-col divide-y divide-gray-200 rounded-lg border bg-white">
					{cart.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 transition"
						>
							{/* Image */}
							<div className="flex items-center gap-8">
								<Image
									src={item.img}
									alt={item.title}
									width={80}
									height={80}
									className="rounded-xl border w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover"
								/>
								<p className="text-gray-700 font-medium font-inter text-xs lg:text-base">
									{item.title}
								</p>
							</div>

							{/* Quantity */}
							<div className="flex items-center gap-2 font-roboto">
								<p className="text-gray-500">@{item.quantity}</p>

								{/* Price */}
								<p className="font-semibold text-gray-900">
									${(item.quantity * item.price).toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="flex flex-col gap-3 rounded-2xl border bg-white p-6 shadow-sm">
					{/* Price */}
					<div className="flex items-center justify-between text-gray-700 font-roboto">
						<span>Price:</span>
						<span className="font-medium">${getTotalPrice().toFixed(2)}</span>
					</div>

					{/* Delivery */}
					<div className="flex items-center justify-between text-gray-700 font-roboto">
						<span>Delivery:</span>
						<span className="font-medium">
							{SHIPPING_COST === 0 ? "Free" : `$${SHIPPING_COST.toFixed(2)}`}
						</span>
					</div>

					{/* Divider */}
					<div className="border-t pt-3 flex items-center justify-between font-roboto">
						<span className="font-semibold text-lg text-gray-900">Total:</span>
						<span className="font-bold text-lg text-gray-900">
							${(getTotalPrice() + SHIPPING_COST).toFixed(2)}
						</span>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white">
					{/* Submit Button */}
					<Button
						className="w-1/3 h-12 text-sm sm:text-base font-medium bg-red cursor-pointer"
						type="submit"
						form="client-form"
					>
						{isLoading ? "Processing..." : "Confirm order"}
					</Button>

					{/**Payment Method */}
					<div className="flex flex-col gap-6 bg-white p-6">
						<h3 className="font-inter text-base md:text-xl">Payment Method</h3>
						<RadioGroup defaultValue="cash" onValueChange={setMethod}>
							<div className="flex items-center gap-3">
								<RadioGroupItem value="cash" id="cash" />
								<Label htmlFor="cash" className="font-roboto">
									Cash on delivery
								</Label>
							</div>
							<div className="flex items-center gap-3">
								<RadioGroupItem value="bank" id="bank" />
								<Label htmlFor="bank" className="font-roboto">
									Bank
								</Label>
								<Image
									src="/assets/brands/visa.png"
									alt="Visa"
									width={100}
									height={24}
								/>
							</div>
						</RadioGroup>
					</div>
				</div>
			</div>
		</>
	);
};

export default BuyingItems;
