import { create } from "zustand";
import { foodService } from "../services/foodService";
import { useLoadingStore } from "./useLoadingStore";
import { mockFoods } from "../mocks/foods";

export const useFoodStore = create<{
  foodList: any[];
  fetchFoodList: () => Promise<void>;
}>((set) => ({
  foodList: [],
  fetchFoodList: async () => {
    useLoadingStore.getState().setLoading(true);
    try {
      const response = await foodService.getFoods();
      if (response.status === 200 || response.status === 201) {
        set({ foodList: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      // API injoignable en dev (pas de backend local) -> données factices pour pouvoir travailler l'UI.
      if (import.meta.env.DEV) {
        console.warn("[mock] foodList: API injoignable, utilisation des données factices");
        set({ foodList: mockFoods });
      }
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },
}));
