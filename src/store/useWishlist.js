import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { Heart, HeartOff } from "lucide-react";

const useWishlist = create(
  persist((set, get) => ({
    wishlist: [],
    isHydrated: false,
    setHydrated: () => set({ isHydrated: true }),
    setWishlist: (newWishlist) => set({
      wishlist: newWishlist
    }),
    addToWishlist: (id) => {
      set((state) => {
        if (state.wishlist.includes(id)) {
          toast.info("Already in wishlist");
          return state;
        }
        toast.success("Added to Wishlist", {
          description: "You can view it in your wishlist page.",
          className: "bg-white text-gray-900 rounded-2xl shadow-md border border-pink-200"
        });

        return { wishlist: [...state.wishlist, id] };
      });
    },
    removeFromWishlist: (id) => {
      set((state) => {
        const updated = state.wishlist.filter(
          (wishlist_id) => wishlist_id !== id
        );
        toast.error("Removed from Wishlist", {
          description: "The item has been removed successfully.",
          className: "bg-white text-gray-900 rounded-2xl shadow-md border border-red-200"
        });
        return { wishlist: updated };
      });
    },

    clearWishlist: () => {
      set({ wishlist: [] });
    },
    getTotalList: () => get().wishlist.length
  }),
    {
      name: "wishlist-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      }
    }
  )
)

export default useWishlist;