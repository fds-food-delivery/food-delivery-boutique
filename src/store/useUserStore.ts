import { create } from "zustand";
import { toast } from "react-toastify";
import { userService } from "../services/userService";
import { useLoadingStore } from "./useLoadingStore";

const formatUserData = (fullName: string, phone: string, address: string) => ({
  username: phone,
  fullName,
  address,
  phone,
});

export const useUserStore = create<{
  currentUser: any;
  setCurrentUser: (user: any) => void;
  userID: string | null;
  setUserID: (userID: string | null) => void;
  creerCompte: (fullName: string, phone: string, address: string) => Promise<any>;
  update: (email: string, password: string) => Promise<void>;
}>((set, get) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),

  userID: null,
  setUserID: (userID) => set({ userID }),

  creerCompte: async (fullName, phone, address) => {
    try {
      const newUser = formatUserData(fullName, phone, address);
      const response = await userService.createAccount({
        username: newUser.phone,
        fullName: newUser.fullName,
        address: newUser.address,
        phone: newUser.phone,
      });

      if ([200, 201, 400, 409].includes(response.status)) {
        localStorage.setItem("userID", response.data.user._id);
        return response.data;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  },

  update: async (email, password) => {
    useLoadingStore.getState().setLoading(true);
    try {
      const response = await userService.updateAccount(email, password);
      if (response.data.success) {
        toast.success("Compte mis à jour avec succès");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating:", error);
    } finally {
      setTimeout(() => {
        useLoadingStore.getState().setLoading(false);
      }, 5000);
    }
  },
}));
