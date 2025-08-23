"use client";
import * as React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import useCart from "@/features/cart/store/useCart";
export default function SuccessPage() {
  const { clearCart } = useCart();
  React.useEffect(() => {
			// Clear cart in Firebase if redirection is successful
			clearCart();
  }, [clearCart]);
  return (
    <div className="absolute top-0 left-0 right-0 z-[999999] min-h-[100vh] bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-600  mb-2">
          Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-red text-white rounded-xl shadow hover:bg-red-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
