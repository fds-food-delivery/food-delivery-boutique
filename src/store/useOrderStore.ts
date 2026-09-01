import { create } from "zustand";
import { useLoadingStore } from "./useLoadingStore";
import { useFoodStore } from "./useFoodStore";
import { useUserStore } from "./useUserStore";
import { useCartStore } from "./useCartStore";
import { useNotificationStore } from "./useNotificationStore";
import { mockOrders } from "../mocks/orders";

export const createOrder = ({
  userId,
  cartItems,
  address,
  status = "Pending",
  payment = false,
}: {
  userId: string;
  cartItems: Record<string, number>;
  address: string;
  status?: string;
  payment?: boolean;
}) => {
  try {
    if (!userId) {
      throw new Error("L'ID de l'utilisateur est manquant.");
    }
    if (!cartItems || Object.keys(cartItems).length === 0) {
      throw new Error("Le panier est vide ou manquant.");
    }

    const { foodList } = useFoodStore.getState();

    const items = Object.keys(cartItems).map((itemId) => {
      const item = foodList.find((food: any) => food._id === itemId);
      if (!item) {
        throw new Error(`Item avec l'ID ${itemId} n'a pas été trouvé.`);
      }
      return {
        itemId: item._id,
        name: item.name,
        quantity: cartItems[itemId],
        price: item.price,
      };
    });

    const amount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return { userId, items, amount, address, status, payment };
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};

export type PlaceOrderPayload = {
  fullName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  paid?: boolean;
};

export type PlaceOrderResult = {
  success: boolean;
  order?: { _id: string; amount: number; date: string; status: string };
};

// Pas de backend actif — tout le cycle de commande (création de compte,
// création de commande, historique) est simulé localement, dev comme prod.
export const useOrderStore = create<{
  orders: any[];
  setOrders: (orders: any[]) => void;
  getOrdersByCurrentUser: () => Promise<any[] | undefined>;
  placeOrder: (payload: PlaceOrderPayload) => Promise<PlaceOrderResult>;
}>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  getOrdersByCurrentUser: async () => {
    useLoadingStore.getState().setLoading(true);
    const userID = localStorage.getItem("userID");
    if (userID) {
      useUserStore.getState().setUserID(userID);
      set({ orders: mockOrders });
      useLoadingStore.getState().setLoading(false);
      return mockOrders;
    }
    useLoadingStore.getState().setLoading(false);
    return [];
  },

  placeOrder: async ({ fullName, phone, address, paid = false }) => {
    useLoadingStore.getState().setLoading(true);
    try {
      const { creerCompte, setUserID, setCurrentUser } = useUserStore.getState();
      const created = await creerCompte(fullName, phone, address);

      const userID = created.user._id;
      setUserID(userID);

      const currentUser = { fullName, phone, address };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setCurrentUser(currentUser);

      const { cartItems, setCartItems } = useCartStore.getState();
      const order = createOrder({ userId: userID, cartItems, address, status: "Pending", payment: paid });
      if (!order) {
        throw new Error("Impossible de créer la commande.");
      }

      const confirmedOrder = { ...order, _id: `order-${Date.now()}`, date: new Date().toISOString() };

      setCartItems({});
      set({ orders: [confirmedOrder, ...mockOrders] });
      await useNotificationStore.getState().fetchNotifications();

      return { success: true, order: confirmedOrder };
    } catch (error) {
      console.error("Erreur lors de la validation de la commande :", error);
      return { success: false };
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },
}));
