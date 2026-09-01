import { create } from "zustand";
import { useLoadingStore } from "./useLoadingStore";
import { mockCategories } from "../mocks/categories";

// Pas de backend actif — données factices uniquement, dev comme prod.
export const useCategoryStore = create<{
  menu_list: any[];
  fetchCategoriesList: () => Promise<void>;
}>((set) => ({
  menu_list: [],
  fetchCategoriesList: async () => {
    useLoadingStore.getState().setLoading(true);
    set({ menu_list: mockCategories });
    useLoadingStore.getState().setLoading(false);
  },
}));
