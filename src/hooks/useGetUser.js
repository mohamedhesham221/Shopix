// useGetUser.js
"use client";
import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

  return { USER_ID, userDB, updateUserCartInFirebase, updateUserWishlistInFirebase };
}
