import { apiClient } from "./apiClient";

export const categoryService = {
  getCategories: () => apiClient.get("/api/v1/categories"),
};
