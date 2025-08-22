// ServicesSection.jsx
// Section displaying key shop services (Delivery, Support, Guarantee)
// - Uses lucide-react icons for visuals
// - Each service is animated in with <SlideIn />
// - Responsive grid: 1 column (mobile) → 3 columns (md+ screens)

"use client";
import * as React from "react";
import { Truck, Headphones, Shield } from "lucide-react";
import SlideIn from "@/shared/animations/SlideIn";
const services = [
	{
		icon: Truck,
		title: "FREE AND FAST DELIVERY",
		description:
			"Enjoy complimentary shipping on all orders with our express delivery service. Get your products delivered to your doorstep within 24-48 hours.",
		bgColor: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		icon: Headphones,
		title: "24/7 CUSTOMER SERVICE",
		description:
			"Our dedicated support team is available round the clock to assist you. Contact us anytime via phone, chat, or email for instant help.",
		bgColor: "bg-green-100",
		iconColor: "text-green-600",
	},
	{
		icon: Shield,
		title: "MONEY BACK GUARANTEE",
		description:
			"Shop with confidence knowing that we offer a 100% money-back guarantee. Not satisfied? Return your purchase within 30 days for a full refund.",
		bgColor: "bg-purple-100",
		iconColor: "text-purple-600",
	},
];

const ServicesSection = () => {
	return (
		<>
			<div className="bg-gray-50 py-16 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{services.map((service, index) => {
							const IconComponent = service.icon;
							return (
								<SlideIn key={index} index={index}>
									<div
										key={index}
										className="bg-whit rounded-lg p-8 text-center"
									>
										<div className="flex justify-center mb-4">
											<div className={`${service.bgColor} p-4 rounded-full`}>
												<IconComponent
													className={`w-8 h-8 ${service.iconColor}`}
												/>
											</div>
										</div>
										<h3 className="text-base md:text-xl font-bold font-inter text-gray-800 mb-3">
											{service.title}
										</h3>
										<p className="text-sm text-primary leading-relaxed">
											{service.description}
										</p>
									</div>
								</SlideIn>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ServicesSection;
