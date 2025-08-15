"use client";
import useCart from "@/store/useCart";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useGetUser } from "@/hooks/useGetUser";

export default function CartSyncProvider({ children }) {
  const { isSignedIn } = useUser();
  const { userDB, updateUserCartInFirebase } = useGetUser();
  const { cart, setCart, isHydrated } = useCart();

  const [isCartLoadedFromFirebase, setIsCartLoadedFromFirebase] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    if (isSignedIn && userDB?.cart) {
      setCart(userDB.cart);
      setIsCartLoadedFromFirebase(true);
    } else if (!isSignedIn) {
      setCart([]);
      setIsCartLoadedFromFirebase(false);
    }
  }, [isHydrated, isSignedIn, userDB]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isSignedIn) return;
    if (!isCartLoadedFromFirebase) return;

    updateUserCartInFirebase(cart);
  }, [cart, isHydrated, isSignedIn, isCartLoadedFromFirebase]);

  return children;
}
