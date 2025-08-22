// WishlistSyncProvider.jsx
// React context-like provider that keeps the wishlist in sync between:
// - Local Zustand store (client state)
// - Firebase (persistent storage)
// - Clerk authentication (user identity)
//
// Flow:
// 1. On sign in → fetch wishlist from Firebase and set it in Zustand.
// 2. On sign out → clear wishlist.
// 3. On wishlist change → push updates back to Firebase (only after initial load).
//
// This ensures consistency between client and server while avoiding unnecessary writes.

"use client";
import useWishlist from "@/features/wishlist/store/useWishlist";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useGetUser } from "@/shared/hooks/useGetUser";

export default function WishlistSyncProvider({ children }) {
	const { isSignedIn } = useUser();
	const { userDB, updateUserWishlistInFirebase } = useGetUser();
	const { wishlist, setWishlist, isHydrated } = useWishlist();

	const [isWishlistLoadedFromFirebase, setIsWishlistLoadedFromFirebase] =
		useState(false);

	//init sync
	useEffect(() => {
		if (isSignedIn && userDB) {
			if (JSON.stringify(userDB?.wishlist) !== JSON.stringify(wishlist)) {
				setWishlist(userDB?.wishlist || []);
			}
			setIsWishlistLoadedFromFirebase(true);
		} else {
			setWishlist([]);
			setIsWishlistLoadedFromFirebase(false);
		}
	}, [isSignedIn, userDB, isHydrated]);

	useEffect(() => {
		if (!isHydrated || !isSignedIn || !isWishlistLoadedFromFirebase) return;
		updateUserWishlistInFirebase(wishlist);
	}, [wishlist, isHydrated, isSignedIn, isWishlistLoadedFromFirebase]);

	return children;
}
