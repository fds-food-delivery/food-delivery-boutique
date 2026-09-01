import { create } from "zustand";
import { useLoadingStore } from "./useLoadingStore";
import { mockFoods } from "../mocks/foods";

// Ce projet n'a pas de backend actif — tout tourne sur les données factices,
// en dev comme en prod. Pas d'appel réseau ici.
export const useFoodStore = create<{
  foodList: any[];
  fetchFoodList: () => Promise<void>;
}>((set) => ({
  foodList: [],
  fetchFoodList: async () => {
    useLoadingStore.getState().setLoading(true);
    set({ foodList: mockFoods });
    useLoadingStore.getState().setLoading(false);
  },
}));
