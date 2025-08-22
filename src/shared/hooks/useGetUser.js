// File: useGetUser.js
// Purpose: Custom React hook to sync Clerk user with Firebase user document
// Notes: Provides access to user data in Firestore and functions to update cart, wishlist, and orders
"use client";
import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from "@/core/lib/firebase";
import { v4 as uuidv4 } from "uuid";

export function useGetUser() {
  const [userDB, setUserDB] = React.useState(null);
  const { user } = useUser();
  const USER_ID = user?.id;

    // Update user's cart in Firebase
  const updateUserCartInFirebase = async (cart) => {
    if (!USER_ID) return;
    try {
      const userRef = doc(db, "users", USER_ID);
      await updateDoc(userRef, { cart });
    } catch (error) {
      console.error("Error updating cart in Firebase:", error);
    }
  };

    // Update user's wishlist in Firebase
  const updateUserWishlistInFirebase = async (wishlist) => {
    if (!USER_ID) return;
    try {
      const userRef = doc(db, "users", USER_ID);
      await updateDoc(userRef, { wishlist });
    } catch (error) {
      console.error("Error updating wishlist in Firebase:", error);
    }
  };

    // Add new order to user's orders array in Firebase (with a unique orderId)
  const updateUserOrdersInFirebase = async (newOrder) => {
    if (!USER_ID) return;
    try {
      const userRef = doc(db, "users", USER_ID);
      const orderWithId = { ...newOrder, orderId: uuidv4() };
      await updateDoc(userRef, {
        orders: arrayUnion(orderWithId),
      });
    } catch (error) {
      console.error("Error updating orders in Firebase:", error);
    }
  }
    // Listen for real-time updates to the user's Firestore document
  React.useEffect(() => {
    if (!USER_ID) return;

    const userRef = doc(db, "users", USER_ID);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserDB({ id: docSnap.id, ...docSnap.data() });
      } else {
        setUserDB(null);
      }
    });

    return () => unsubscribe();
  }, [USER_ID]);

  return { USER_ID, userDB, updateUserCartInFirebase, updateUserWishlistInFirebase, updateUserOrdersInFirebase };
}
