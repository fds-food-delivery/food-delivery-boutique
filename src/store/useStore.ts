import { useLoadingStore } from "./useLoadingStore";
import { useFoodStore } from "./useFoodStore";
import { useCategoryStore } from "./useCategoryStore";
import { useCartStore } from "./useCartStore";
import { useUserStore } from "./useUserStore";
import { useNotificationStore } from "./useNotificationStore";
import { useOrderStore } from "./useOrderStore";

export const initStore = async () => {
  const userID = localStorage.getItem("userID");
  if (userID) {
    useUserStore.getState().setUserID(userID);
  }
  const storedCurrentUser = localStorage.getItem("currentUser");
  if (storedCurrentUser) {
    try {
      useUserStore.getState().setCurrentUser(JSON.parse(storedCurrentUser));
    } catch {
      // valeur corrompue, on l'ignore silencieusement
    }
  }
  await Promise.all([
    useFoodStore.getState().fetchFoodList(),
    useCategoryStore.getState().fetchCategoriesList(),
  ]);
  try {
    await useOrderStore.getState().getOrdersByCurrentUser();
  } catch {
    // pas de commande / pas d'utilisateur connu, comportement inchangé
  }
  if (userID) {
    await useNotificationStore.getState().fetchNotifications();
  }
};

/**
 * Facade compat: regroupe tous les stores Zustand sous la même forme que
 * l'ancien StoreContext, pour limiter le nombre de fichiers à modifier.
 */
export const useStore = () => {
  const loadingState = useLoadingStore();
  const foodState = useFoodStore();
  const categoryState = useCategoryStore();
  const cartState = useCartStore();
  const userState = useUserStore();
  const notificationState = useNotificationStore();
  const orderState = useOrderStore();

  return {
    ...loadingState,
    ...foodState,
    ...categoryState,
    ...cartState,
    ...userState,
    ...notificationState,
    ...orderState,

    getOrders: orderState.getOrdersByCurrentUser,
  };
};
