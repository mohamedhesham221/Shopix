// ClientDetailsForm.jsx
// Form component for collecting customer shipping and contact information during checkout.
// - Uses React Hook Form with Zod validation for robust form handling
// - Collects required fields: fullName, email, phoneNumber, city, streetAddress
// - Optional apartmentFloor field for detailed address information
// - Validates input with custom error messages and field descriptions
// - Integrates with checkout process by calling handleCheckout prop on submission
// - Responsive design with Tailwind CSS styling and form reset on successful submission

"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

// Zod validation schema for form fields with custom error messages
const formSchema = z.object({
	fullName: z.string().min(5, {
		message: "Your name must be at least 8 characters.",
	}),
	apartmentFloor: z.coerce
		.number()
		.min(1, {
			message: "Apartment or floor number must be at least 1.",
		})
		.optional(),
	city: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	phoneNumber: z.string().min(10, {
		message: "Phone number must be at least 10 characters.",
	}),
	email: z.email("Invalid email address."),
	streetAddress: z.string().min(5, {
		message: "Street address must be at least 5 characters.",
	}),
});

const ClientDetailsForm = ({
	handleCheckout,
}) => {
		// Initialize React Hook Form with Zod resolver and default values
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			apartmentFloor: "",
			city: "",
			phoneNumber: "",
			streetAddress: "",
			email: "",
		},
	});

		// Handle form submission - validates data and triggers checkout process
	const onSubmit = (data) => {
		console.log("Form submitted:", data);
		const formData = {
			...data,
		};
		try {
			handleCheckout(formData);
			form.reset();
		} catch (err) {
			console.error("Error during checkout:", err);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full md:w-1/2"
				id="client-form"
			>
				{/* First Name */}
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="label-style">
								Full Name <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="e.g. John Doe"
									className="font-roboto bg-gray-100 rounded "
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Please enter your given name as it appears on official
								documents.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="label-style">
								Email Address <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="example@gmail.com"
									className="font-roboto bg-gray-100 rounded"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								We will use this email for login and communication.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Phone Number */}
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="label-style">
								Phone Number <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									type="tel"
									placeholder="+1 555 123 4567"
									className="font-roboto bg-gray-100 rounded"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Enter a valid phone number including country code.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* City */}
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="label-style">
								City <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="e.g. New York"
									className="font-roboto bg-gray-100 rounded"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Enter the city where you currently reside.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Apartment / Floor */}
				<FormField
					control={form.control}
					name="apartmentFloor"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="label-style">
								Apartment / Floor (optional)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="e.g. 5"
									className="font-roboto bg-gray-100 rounded"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Provide your apartment or floor number if applicable.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Street Address */}
				<FormField
					control={form.control}
					name="streetAddress"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="label-style">
								Street Address <span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="123 Main Street, Building 4"
									className="font-roboto bg-gray-100 rounded"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Please provide your full street address including building
								details.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default ClientDetailsForm;
