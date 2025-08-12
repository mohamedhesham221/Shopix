import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlist = create(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (item) =>
        set((state) => ({
          wishlist: state.wishlist.some((wishlistItem) => wishlistItem.id === item.id)
            ? state.wishlist
            : [...state.wishlist, item],
        })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),
      clearWishlist: () =>
        set(() => ({
          wishlist: [],
        })),
      getTotalItems: () =>
        get().wishlist.length,
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

export default useWishlist;
