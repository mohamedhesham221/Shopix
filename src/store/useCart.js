import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCart = create(
  persist(
    (set, get) => ({
      cart: [],
      isHydrated: false,
      
      setHydrated: () => set({ isHydrated: true }),
      
      setCart: (newCart) => set({ 
        cart: newCart,
      }),
      
      addToCart: (item) => set((state) => ({
        cart: state.cart.some((cartItem) => cartItem.id === item.id)
          ? state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
              : cartItem
          )
          : [...state.cart, { ...item, quantity: item.quantity || 1 }],
      })),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),
      
      clearCart: () => set(() => ({
        cart: [],
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })),
      
      incrementQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })),
      
      decrementQuantity: (id) => set((state) => ({
        cart: state.cart
          .map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      })),
      
      getTotalProducts: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),

      getTotalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export default useCart;