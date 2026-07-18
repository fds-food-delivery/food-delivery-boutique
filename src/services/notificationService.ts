import { apiClient } from "./apiClient";

export const notificationService = {
  getNotifications: (userId: string) =>
    apiClient.get(`/api/v1/notifications?userId=${userId}`),
};
