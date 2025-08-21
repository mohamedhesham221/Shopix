import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { images } from "../../../../next.config";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { userId } = await auth();
  // Check if user is authenticated
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { cart, formData } = await req.json();
  // Validate cart data
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map(item => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.title, images: item.img ? [item.img] : [] },
          unit_amount: Math.round(item.price * 100), // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      })),
      success_url: "https://shopix.vercel.app/checkout/success",
      cancel_url: "https://shopix.vercel.app/checkout",
      metadata: {
        userId: userId,
        cart: JSON.stringify(cart),
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        streetAddress: formData.streetAddress,
        apartmentFloor: formData.apartmentFloor,
      },
    });
    console.log(userId);
    console.log("Checkout session created:", session.id);
    console.log("Session metadata:", session.metadata);
    
    return NextResponse.json({ id: session.id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
