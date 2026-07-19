// Simulation de paiement mobile money (Wave / Orange Money) — il n'y a pas de
// vraie intégration avec ces opérateurs, uniquement un mock qui imite le délai
// d'une confirmation USSD côté client avant de marquer la commande payée.
export type MockPaymentResult = {
  success: boolean;
  transactionId: string;
};

export const mockProcessPayment = ({
  method,
  phone,
}: {
  method: string;
  phone: string;
}): Promise<MockPaymentResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `mock-${method}-${phone}-${Date.now()}`,
      });
    }, 2000);
  });
