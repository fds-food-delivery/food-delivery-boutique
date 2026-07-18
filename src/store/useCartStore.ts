import { create } from "zustand";
import { toast } from "react-toastify";
import { useFoodStore } from "./useFoodStore";

export const useCartStore = create<{
  cartItems: Record<string, number>;
  setCartItems: (cartItems: Record<string, number>) => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  deleteFromCart: (itemId: string) => void;
  totalPrice: () => number;
}>((set, get) => ({
  cartItems: {},

  setCartItems: (cartItems) => set({ cartItems }),

  addToCart: (itemId) => {
    const { cartItems } = get();
    if (!cartItems[itemId]) {
      toast.success("Votre plat a été ajouté au panier");
      set({ cartItems: { ...cartItems, [itemId]: 1 } });
    } else {
      set({ cartItems: { ...cartItems, [itemId]: cartItems[itemId] + 1 } });
    }
  },

  removeFromCart: (itemId) => {
    const { cartItems, deleteFromCart } = get();
    if (cartItems[itemId] === 1) {
      deleteFromCart(itemId);
      return;
    }
    set({ cartItems: { ...cartItems, [itemId]: cartItems[itemId] - 1 } });
  },

  deleteFromCart: (itemId) => {
    const newCartItems = { ...get().cartItems };
    delete newCartItems[itemId];
    set({ cartItems: newCartItems });
  },

  totalPrice: () => {
    const { cartItems } = get();
    const { foodList } = useFoodStore.getState();
    return Object.keys(cartItems).reduce((acc, id) => {
      const item = foodList.find((food: any) => food._id === id);
      return acc + (item ? item.price * cartItems[id] : 0);
    }, 0);
  },
}));
