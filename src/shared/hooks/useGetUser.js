// useGetUser.js
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

  const updateUserCartInFirebase = async (cart) => {
    if (!USER_ID) return;
    try {
      const userRef = doc(db, "users", USER_ID);
      await updateDoc(userRef, { cart });
    } catch (error) {
      console.error("Error updating cart in Firebase:", error);
    }
  };

  const updateUserWishlistInFirebase = async (wishlist) => {
    if (!USER_ID) return;
    try {
      const userRef = doc(db, "users", USER_ID);
      await updateDoc(userRef, { wishlist });
    } catch (error) {
      console.error("Error updating wishlist in Firebase:", error);
    }
  };

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
