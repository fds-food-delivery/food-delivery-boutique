import { create } from "zustand";
import { categoryService } from "../services/categoryService";
import { useLoadingStore } from "./useLoadingStore";
import { mockCategories } from "../mocks/categories";

export const useCategoryStore = create<{
  menu_list: any[];
  fetchCategoriesList: () => Promise<void>;
}>((set) => ({
  menu_list: [],
  fetchCategoriesList: async () => {
    useLoadingStore.getState().setLoading(true);
    try {
      const response = await categoryService.getCategories();
      if (response.status === 200 || response.status === 201) {
        set({ menu_list: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching categories list:", error);
      if (import.meta.env.DEV) {
        console.warn("[mock] menu_list: API injoignable, utilisation des données factices");
        set({ menu_list: mockCategories });
      }
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },
}));
