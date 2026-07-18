import { create } from "zustand";
import { toast } from "react-toastify";
import { commandeService } from "../services/commandeService";
import { useLoadingStore } from "./useLoadingStore";
import { useFoodStore } from "./useFoodStore";
import { useUserStore } from "./useUserStore";
import { useUIStore } from "./useUIStore";
import { useCartStore } from "./useCartStore";
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
  payment?: boolean | string | null;
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

export const useOrderStore = create<{
  orders: any[];
  setOrders: (orders: any[]) => void;
  fetchOrders: () => Promise<void>;
  getOrdersByCurrentUser: () => Promise<any[] | undefined>;
  validerCommande: (
    fullName?: string,
    phone?: string,
    address?: string
  ) => Promise<boolean>;
  handleConfirmedOrder: () => Promise<void>;
}>((set, get) => ({
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

  validerCommande: async (fullName = "", phone = "", address = "") => {
    const { creerCompte, setUserID } = useUserStore.getState();
    const { selectedPayment } = useUIStore.getState();
    try {
      const newUserId = await creerCompte(fullName, phone, address);

      if (!newUserId || !newUserId.user._id) {
        throw new Error("Impossible de créer l'utilisateur.");
      }

      const userID = newUserId.user._id;
      localStorage.setItem("userID", userID);
      setUserID(userID);

      const { cartItems, setCartItems } = useCartStore.getState();

      const order = createOrder({
        userId: userID,
        cartItems,
        address,
        status: "Pending",
        payment: selectedPayment,
      });

      const response = await commandeService.createOrder(order);

      if (response.status === 200 || response.status === 201) {
        setCartItems({});
        return true;
      }
      throw new Error("Erreur lors de la création de la commande.");
    } catch (error) {
      console.error("Erreur lors de la validation de la commande :", error);
      return false;
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },

  handleConfirmedOrder: async () => {
    const { validerCommande } = get();
    const { setOpenModalValiderHandle, setOpenModalValidatedHandle, setOpenModalErrorHandle } =
      useUIStore.getState();
    const reponse = await validerCommande();
    if (reponse) {
      setOpenModalValiderHandle(false);
      setOpenModalValidatedHandle(true);
    } else {
      setOpenModalValiderHandle(false);
      setOpenModalErrorHandle(true);
    }
  },
}));
