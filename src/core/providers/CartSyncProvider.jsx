"use client";
import useCart from "@/features/cart/store/useCart";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useGetUser } from "@/shared/hooks/useGetUser";
import { mergeCartData } from "@/core/utils/helpers";

export default function CartSyncProvider({ children }) {
	const { isSignedIn } = useUser();
	const { userDB, updateUserCartInFirebase } = useGetUser();
	const { cart, setCart, isHydrated } = useCart();

	const [isCartLoadedFromFirebase, setIsCartLoadedFromFirebase] =
		useState(false);
	// Initial Sync
	useEffect(() => {
		if (!isHydrated || !isSignedIn) return;

		if (isSignedIn && userDB) {
			const firebaseCart = userDB?.cart || [];
			const localCart = cart || [];

			console.log("local cart", localCart);
			console.log("firebase cart", firebaseCart);

			let finalCart = [];

			if (firebaseCart.length > 0 && localCart.length === 0) {
				finalCart = firebaseCart;
			} else if (firebaseCart.length === 0 && localCart.length > 0) {
				updateUserCartInFirebase(localCart);
				finalCart = localCart;
			} else if (firebaseCart.length > 0 && localCart.length > 0) {
				finalCart = mergeCartData(localCart, firebaseCart);
				updateUserCartInFirebase(finalCart);
			} else {
				finalCart = [];
			}

			console.log("final updated cart", finalCart);
			setCart(finalCart);
			setIsCartLoadedFromFirebase(true);
		} else if (!isSignedIn) {
			setCart([]);
			setIsCartLoadedFromFirebase(false);
		}
	
	}, [isHydrated, isSignedIn, userDB, setCart]);
	// Keep Firebase updated when cart changes
	useEffect(() => {
		if (!isHydrated) return;
		if (!isSignedIn) return;
		if (!isCartLoadedFromFirebase) return;
		const firebaseCart = userDB?.cart || [];
		if (JSON.stringify(firebaseCart) !== JSON.stringify(cart)) {
			updateUserCartInFirebase(cart);
		}
	}, [cart, isHydrated, isSignedIn, isCartLoadedFromFirebase]);

	return children;
}
