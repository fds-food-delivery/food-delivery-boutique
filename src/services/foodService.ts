import { apiClient } from "./apiClient";

export const foodService = {
  getFoods: () => apiClient.get("/api/v1/foods"),
};
