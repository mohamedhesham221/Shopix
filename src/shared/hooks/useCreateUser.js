// File: hooks/useCreateUser.js
// Purpose: Custom React hook that ensures a Clerk user has a corresponding Firestore document
// Notes: Runs on mount when Clerk user is loaded; creates a new Firestore user if one does not exist
"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/core/lib/firebase";

const useCreateUser = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const create = async () => {
      if (!isLoaded || !user?.id) return;

      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);

      // If user document does not exist in Firestore, create it
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          user_id: user.id,
          user_email:
            user?.emailAddresses?.[0]?.emailAddress ||
            user?.primaryEmailAddress?.emailAddress ||
            "",
          user_name: user.fullName || "",
          cart: [],
          wishlist: [],
          orders: [],
          createdAt: new Date().toISOString(),
        });
        console.log("✅ User added to Firestore");
      } else {
        console.log("ℹ️ User already exists in Firestore");
      }
    };

    create();
  }, [isLoaded, user]);
};

export default useCreateUser;
