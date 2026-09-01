import { create } from "zustand";
import { useLoadingStore } from "./useLoadingStore";
import { mockNotifications } from "../mocks/notifications";

// Pas de backend actif — données factices uniquement, dev comme prod.
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
    const userID = localStorage.getItem("userID");
    if (userID) {
      set({ notifications: mockNotifications });
    }
    useLoadingStore.getState().setLoading(false);
  },
}));
