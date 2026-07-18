import { create } from "zustand";
import { notificationService } from "../services/notificationService";
import { useLoadingStore } from "./useLoadingStore";
import { mockNotifications } from "../mocks/notifications";

export const useNotificationStore = create<{
  notifications: any[];
  totalNotifications: number;
  setTotalNotifications: (total: number) => void;
  fetchNotifications: () => Promise<void>;
}>((set) => ({
  notifications: [],
  totalNotifications: 0,
  setTotalNotifications: (totalNotifications) => set({ totalNotifications }),

  fetchNotifications: async () => {
    useLoadingStore.getState().setLoading(true);
    try {
      const userID = localStorage.getItem("userID");
      if (userID) {
        const response = await notificationService.getNotifications(userID);
        if (response.status === 200 || response.status === 201) {
          set({ notifications: response.data });
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      if (import.meta.env.DEV) {
        console.warn("[mock] notifications: API injoignable, utilisation des données factices");
        set({ notifications: mockNotifications });
      }
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },
}));
