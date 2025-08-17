"use client";
import useWishlist from "@/store/useWishlist";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";

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

	console.log("local wishlist", wishlist);
	console.log("firebase wishlist", userDB?.wishlist);

	return children;
}
