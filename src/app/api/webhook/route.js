import Stripe from "stripe";
import { db } from "@/core/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const buf = Buffer.from(await req.arrayBuffer());
    const sig = req.headers.get("stripe-signature");

    let event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return NextResponse("Webhook Error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Parse cart
      let parsedCart;
      try {
        parsedCart = JSON.parse(session.metadata.cart);
      } catch (parseError) {
        return NextResponse("Invalid cart data", { status: 400 });
      }

      const userRef = doc(db, "users", session.metadata.userId);

      const orderData = {
        orderId: session.id,
        items: parsedCart,
        totalAmount: session.amount_total / 100,
        paymentStatus: session.payment_status,
        paymentMethod: "bank",
        createdAt: new Date().toISOString(),
        email: session.metadata.email || null,
        fullName: session.metadata.fullName || null,
        phoneNumber: session.metadata.phoneNumber || null,
        city: session.metadata.city || null,
        streetAddress: session.metadata.streetAddress || null,
        apartmentFloor: session.metadata.apartmentFloor || null,
      };

      try {
        await updateDoc(userRef, { orders: arrayUnion(orderData) });
        console.log("Order successfully added");
        await updateDoc(userRef, { cart: [] }); // Clear the cart after successful payment
      } catch (firestoreError) {
        console.error("Firestore update error:", firestoreError);
        return NextResponse("Database Error", { status: 500 });
      }
    }

    return NextResponse(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse("Internal Server Error", { status: 500 });
  }
}
