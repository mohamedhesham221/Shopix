"use client";
import { useGetUser } from "@/hooks/useGetUser";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust path to your firebase config
import { useState, useEffect } from "react";

export function useWishlist() {
  const { userDB } = useGetUser();
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update local state when userDB changes
  useEffect(() => {
    if (userDB?.wishlist) {
      setWishlist(userDB.wishlist);
    } else {
      setWishlist([]);
    }
  }, [userDB?.wishlist]);

  // Add item to wishlist
  const addToWishlist = async (item) => {
    if (!user?.id || !userDB?.id) {
      setError("User not authenticated");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const newItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };

      const userDocRef = doc(db, "users", userDB.id);
      await updateDoc(userDocRef, {
        wishlist: arrayUnion(newItem),
      });

      // Update local state optimistically
      setWishlist(prev => [...prev, newItem]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item to wishlist");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (itemId) => {
    if (!user?.id || !userDB?.id) {
      setError("User not authenticated");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Find the item to remove
      const itemToRemove = wishlist.find(item => item.id === itemId);
      if (!itemToRemove) {
        setError("Item not found in wishlist");
        return false;
      }

      const userDocRef = doc(db, "users", userDB.id);
      await updateDoc(userDocRef, {
        wishlist: arrayRemove(itemToRemove),
      });

      // Update local state optimistically
      setWishlist(prev => prev.filter(item => item.id !== itemId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item from wishlist");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get all wishlist items
  const getAllItems = () => {
    return wishlist;
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    if (!user?.id || !userDB?.id) {
      setError("User not authenticated");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const userDocRef = doc(db, "users", userDB.id);
      await updateDoc(userDocRef, {
        wishlist: [],
      });

      // Update local state
      setWishlist([]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear wishlist");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlist.some(item => item.id === itemId);
  };

  // Get wishlist count
  const getWishlistItems = () => {
    return wishlist.length;
  };

  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    getAllItems,
    clearWishlist,
    isInWishlist,
    getWishlistItems,
  };
}