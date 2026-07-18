import { apiClient } from "./apiClient";

export const commandeService = {
  createOrder: (order: unknown) => apiClient.post("/api/v1/orders", order),

  getOrders: () => apiClient.get("/api/v1/orders"),

  getOrdersByUser: (userId: string) =>
    apiClient.post("/api/v1/orders/userorders", { userId }),
};
