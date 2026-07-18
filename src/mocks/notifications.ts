// Données factices utilisées quand l'API est injoignable en dev (voir useNotificationStore).
export const mockNotifications = [
  {
    _id: "mock-notif-1",
    userId: "mock-user",
    message: "Votre commande a été prise en compte.",
    type: "order",
    status: "unread",
    date: new Date().toISOString(),
  },
  {
    _id: "mock-notif-2",
    userId: "mock-user",
    message: "Votre livreur est en route.",
    type: "delivery",
    status: "unread",
    date: new Date().toISOString(),
  },
];
