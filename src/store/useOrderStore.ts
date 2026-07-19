import { create } from "zustand";
import { toast } from "react-toastify";
import { commandeService } from "../services/commandeService";
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

    // Le backend modélise `payment` comme un booléen "déjà payé" (orderModel.js),
    // pas comme un champ "méthode de paiement". Pour le paiement à la livraison
    // c'est toujours false ; pour Wave/Orange Money c'est true une fois le mock
    // de paiement confirmé (voir placeOrder). Il n'y a pas de champ backend pour
    // stocker la méthode elle-même pour l'instant.
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

export const useOrderStore = create<{
  orders: any[];
  setOrders: (orders: any[]) => void;
  fetchOrders: () => Promise<void>;
  getOrdersByCurrentUser: () => Promise<any[] | undefined>;
  placeOrder: (payload: PlaceOrderPayload) => Promise<PlaceOrderResult>;
}>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  fetchOrders: async () => {
    useLoadingStore.getState().setLoading(true);
    try {
      const response = await commandeService.getOrders();
      if (!response.data.success) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },

  getOrdersByCurrentUser: async () => {
    useLoadingStore.getState().setLoading(true);
    const { setUserID } = useUserStore.getState();
    const userID = localStorage.getItem("userID");
    if (userID) {
      setUserID(userID);
    }
    try {
      const response = await commandeService.getOrdersByUser(userID as string);
      if (response.status === 200 || response.status === 201) {
        set({ orders: response.data });
        return response.data;
      }
      throw new Error("Error getting orders");
    } catch (error) {
      console.error("Error getting orders:", error);
      if (import.meta.env.DEV) {
        console.warn("[mock] orders: API injoignable, utilisation des données factices");
        set({ orders: mockOrders });
        return mockOrders;
      }
      throw error;
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },

  placeOrder: async ({ fullName, phone, address, paid = false }) => {
    useLoadingStore.getState().setLoading(true);
    const { creerCompte, setUserID, setCurrentUser } = useUserStore.getState();
    try {
      const created = await creerCompte(fullName, phone, address);

      if (!created || !created.user._id) {
        throw new Error("Impossible de créer l'utilisateur.");
      }

      const userID = created.user._id;
      localStorage.setItem("userID", userID);
      setUserID(userID);

      const currentUser = { fullName, phone, address };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setCurrentUser(currentUser);

      const { cartItems, setCartItems } = useCartStore.getState();

      const order = createOrder({ userId: userID, cartItems, address, status: "Pending", payment: paid });

      let confirmedOrder;
      try {
        const response = await commandeService.createOrder(order);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Erreur lors de la création de la commande.");
        }
        confirmedOrder = response.data.order;
      } catch (apiError) {
        if (!import.meta.env.DEV) {
          throw apiError;
        }
        console.error("Error creating order:", apiError);
        console.warn("[mock] commande: API injoignable, commande factice créée");
        confirmedOrder = { ...order, _id: `mock-order-${Date.now()}`, date: new Date().toISOString() };
      }

      setCartItems({});

      // La commande vient de générer une notification côté backend et doit
      // apparaître dans l'historique — on rafraîchit les deux sans bloquer
      // l'affichage de la confirmation si l'un des deux échoue.
      Promise.allSettled([
        useOrderStore.getState().getOrdersByCurrentUser(),
        useNotificationStore.getState().fetchNotifications(),
      ]);

      return { success: true, order: confirmedOrder };
    } catch (error) {
      console.error("Erreur lors de la validation de la commande :", error);
      return { success: false };
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },
}));
