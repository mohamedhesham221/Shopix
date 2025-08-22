// CartSyncProvider.jsx
// React context-like provider to sync cart state between:
// 1. Local Zustand store (useCart)
// 2. Firebase user document
// 3. Clerk authentication state
//
// Responsibilities:
// - On sign in: merge local cart with Firebase cart
// - On sign out: reset local cart
// - Keep Firebase updated when local cart changes
//
// Sync Strategy:
//   - Firebase not empty, Local empty   => Use Firebase cart
//   - Firebase empty, Local not empty   => Push Local to Firebase
//   - Both non-empty                    => Merge both (using mergeCartData)
//   - Both empty                        => Empty cart

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
	// Initial Sync when user logs in/out or hydration completes
	useEffect(() => {
		if (!isHydrated || !isSignedIn) return;

		if (isSignedIn && userDB) {
			const firebaseCart = userDB?.cart || [];
			const localCart = cart || [];

			let finalCart = [];

			if (firebaseCart.length > 0 && localCart.length === 0) {
				// Case 1: Firebase has data, local is empty → take Firebase
				finalCart = firebaseCart;
			} else if (firebaseCart.length === 0 && localCart.length > 0) {
				// Case 2: Local has data, Firebase empty → push local
				updateUserCartInFirebase(localCart);
				finalCart = localCart;
			} else if (firebaseCart.length > 0 && localCart.length > 0) {
				// Case 3: Both have data → merge
				finalCart = mergeCartData(localCart, firebaseCart);
				updateUserCartInFirebase(finalCart);
			} else {
				// Case 4: Both empty
				finalCart = [];
			}

			setCart(finalCart);
			setIsCartLoadedFromFirebase(true);
		} else if (!isSignedIn) {
						// On logout → clear local state
			setCart([]);
			setIsCartLoadedFromFirebase(false);
		}
	}, [isHydrated, isSignedIn, userDB, setCart]);
	// Keep Firebase updated whenever cart changes (after initial load)
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
