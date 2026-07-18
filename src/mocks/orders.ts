// Données factices utilisées quand l'API est injoignable en dev (voir useOrderStore).
export const mockOrders = [
  {
    _id: "mock-order-1",
    date: new Date().toISOString(),
    status: "Pending",
    amount: 6500,
  },
  {
    _id: "mock-order-2",
    date: new Date(Date.now() - 86400000).toISOString(),
    status: "Delivered",
    amount: 3000,
  },
];
