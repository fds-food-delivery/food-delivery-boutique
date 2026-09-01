import { create } from "zustand";

// Pas de backend actif — la "création de compte" est simulée localement,
// dev comme prod : pas de vrai compte, juste une identité légère basée sur
// le téléphone, comme le reste du projet le fait déjà (voir useOrderStore).
export const useUserStore = create<{
  currentUser: any;
  setCurrentUser: (user: any) => void;
  userID: string | null;
  setUserID: (userID: string | null) => void;
  creerCompte: (fullName: string, phone: string, address: string) => Promise<any>;
}>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),

  userID: null,
  setUserID: (userID) => set({ userID }),

  creerCompte: async (fullName, phone, address) => {
    const user = {
      _id: `user-${phone || Date.now()}`,
      username: phone,
      fullName,
      phone,
      address,
    };
    localStorage.setItem("userID", user._id);
    return { user };
  },
}));
