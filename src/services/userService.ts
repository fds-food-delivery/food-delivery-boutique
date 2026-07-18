import { apiClient } from "./apiClient";

export const userService = {
  createAccount: (payload: {
    username: string;
    fullName: string;
    address: string;
    phone: string;
  }) => apiClient.post("/api/v1/auth/users", payload),

  updateAccount: (email: string, password: string) =>
    apiClient.post("/api/user/update", { email, password }),
};
