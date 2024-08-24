import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import food_25 from "../assets/food_25.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
	salade_sauce,
	salade_supplementaire,
	salade_types_liste,
} from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [cartItems, setCartItems] = useState({});

	// const url = "https://backend-food-ordering.onrender.com";
	const url = "http://localhost:4000";
	const [foodList, setFoodList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const [Orders, setOrders] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalChildren, setModalChildren] = useState(null);
	const [token, setToken] = useState(null);
	// navigate
	const navigate = useNavigate();

	const [saladeTypesListe, setSaladeTypesListe] = useState([
		{
			_id: "10",
			name: "Laitue",
			image: food_25,
			price: 0,
			description: "Fresh and crispy lettuce.",
			category: "Salade",
		},
		{
			_id: "20",
			name: "Roquette",
			image: food_25,
			price: 0,
			description: "Peppery and nutritious arugula.",
			category: "Salade",
		},
		{
			_id: "30",
			name: "Chou frisé",
			image: food_25,
			price: 0,
			description: "Healthy and fibrous kale.",
			category: "Salade",
		},
	]);

	const openModalHandle = (children) => {
		setIsModalOpen(true);
		setModalChildren(children);
	};

	const [saladeSauce, setSaladeSauce] = useState([
		{
			_id: "1",
			name: "Vinaigrette",
			image: food_25,
			price: 0,
			description: "Classic vinaigrette.",
			category: "Sauce",
		},
		{
			_id: "2",
			name: "Ranch",
			image: food_25,
			price: 0,
			description: "Creamy and tangy ranch.",
			category: "Sauce",
		},
		{
			_id: "3",
			name: "Sauce César",
			image: food_25,
			price: 0,
			description: "Rich and savory Caesar.",
			category: "Sauce",
		},
	]);

	const [saladeSupplementaire, setSaladeSupplementaire] = useState([
		{
			_id: "1",
			name: "Croutons",
			image: food_25,
			price: 0,
			description: "Crunchy croutons.",
			category: "Supplementaire",
		},
		{
			_id: "2",
			name: "Fromage",
			image: food_25,
			price: 0,
			description: "Grated cheese.",
			category: "Supplementaire",
		},
		{
			_id: "3",
			name: "Bacon",
			image: food_25,
			price: 0,
			description: "Crispy bacon bits.",
			category: "Supplementaire",
		},
	]);

	const totalPrice = () => {
		return Object.keys(cartItems).reduce((acc, id) => {
			const item = foodList.find((food) => food._id === id);
			return acc + item.price * cartItems[id];
		}, 0);
	};

	const addToCart = (itemId) => {
		if (!cartItems[itemId]) {
			toast.success("Votre plat a été ajouté au panier");
			setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
		} else {
			// toast.success("Votre plat a été ajouté au panier");
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
	};

	const removeFromCart = (itemId) => {
		if (cartItems[itemId] === 1) {
			deleteFromCart(itemId);
			return;
		}
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
	};

	const deleteFromCart = (itemId) => {
		const newCartItems = { ...cartItems };
		delete newCartItems[itemId];
		setCartItems(newCartItems);
	};

	// const loginUser = async (username, password) => {
	// 	try {
	// 		const response = await axios.post(`${url}/api/v1/auth/login`, {
	// 			username: username,
	// 			password: password,
	// 		});
	// 		if (response.status === 200) {
	// 			console.log("response.data", response.data);
	// 			setCurrentUser({
	// 				userId: response.data.userId,
	// 				username: response.data.username,
	// 				firstName: response.data.firstName,
	// 				lastName: response.data.lastName,
	// 				phone: response.data.phone,
	// 				email: response.data.email,
	// 				address: {
	// 					street: response.data.address.street,
	// 					city: response.data.address.city,
	// 					state: response.data.address.state,
	// 					zipCode: response.data.address.zipCode,
	// 					country: response.data.address.country
	// 				},
	// 				profileImage: response.data.profileImage
	// 			});
	// 			setToken(response.data.token);
	// 			localStorage.setItem("token", response.data.token);
	// 			setIsAuthenticated(true);
	// 			console.log("Current user:", currentUser);
	// 			// link to accueil
	// 			navigate("/");
	// 			toast.success("Vous êtes connecté");
	// 		} else {
	// 			throw new Error("Erreur lors de la connexion");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error logging in:", error);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };


	const loginUser = async (username, password) => {
		setLoading(true);
		console.log("username", username);
		console.log("password", password);
		try {
			const response = await axios.post(`${url}/api/v1/auth/login`, {
				username: username,
				password: password,
			});
			if (response.status === 200) {
				console.log("response.data", response.data);
			  	const userData = response.data;
			  	setCurrentUser({
					userId: userData.userId,
					username: userData.username,
					firstName: userData.firstName,
					lastName: userData.lastName,
					phone: userData.phone,
					email: userData.email,
					// address: {
					// 	street: userData.address.street ? userData.address.street : "",
					// 	city: userData.address.city ? userData.address.city : "",
					// 	state: userData.address.state,
					// 	zipCode: userData.address.zipCode,
					// 	country: userData.address.country
					// },
					profileImage: userData.profileImage
				});

				setToken(userData.token);
				localStorage.setItem("token", userData.token);
				setIsAuthenticated(true);
				navigate("/");
			} else {
				throw new Error("Erreur lors de la connexion");
			}
		} catch (error) {
			console.error("Error logging in:", error);
		} finally {
			setLoading(false);
		}
	};

	const register = async (email, password) => {
		try {
			const response = await axios.post(`${url}/api/user/register`, {
				email,
				password,
			});
			if (response.data.success) {
				toast.success("Compte créé avec succès");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error registering:", error);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${url}/api/v1/auth/logout`,
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				localStorage.removeItem("token");
				setToken("");
				setIsAuthenticated(false);
				setCurrentUser(null);
				toast.success("Vous êtes déconnecté");
				navigate("/");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error logging out:", error);
		} finally {
			setLoading(false);
		}
	};

	const verify = async () => {
		if (!localStorage.getItem("token")) {
			setCurrentUser(null);
			setIsAuthenticated(false);
			setLoading(false);
			return;
		}
		setToken(localStorage.getItem("token"));
		try {
			const response = await axios.post(
				`${url}/api/v1/auth/verify`,
				{},
				{
					headers: {
						token : localStorage.getItem("token"),
						// Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status !== 200) {
				throw new Error("Erreur lors de la verification");
			}
			setCurrentUser(response.data.user);
			setIsAuthenticated(true);
			console.log("response de verify ", response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error verifying:", error);
			setCurrentUser(null);
			setIsAuthenticated(false);
			setToken("");
			setLoading(false);
			toast.error("Erreur lors de la vérification");
		}
	};

		const createOrder = ({ userId, cartItems, address = {}, status = "Pending", payment = false }) => {
  try {
    // Validation des entrées
    if (!userId) {
      throw new Error("L'ID de l'utilisateur est manquant.");
    }
    if (!cartItems || Object.keys(cartItems).length === 0) {
      throw new Error("Le panier est vide ou manquant.");
    }

    // Trouver les détails des articles dans la liste de nourriture en utilisant les IDs du panier
    const items = Object.keys(cartItems).map((itemId) => {
      const item = foodList.find((food) => food._id === itemId);

      // Vérification si l'item existe dans la foodList
      if (!item) {
        throw new Error(`Item avec l'ID ${itemId} n'a pas été trouvé.`);
      }

      return {
        itemId: item._id,
        name: item.name,
        quantity: cartItems[itemId],
        price: item.price,
      };
    });

    // Calculer le montant total de la commande
    const amount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Créer un nouvel objet de commande basé sur le modèle de commande
    const newOrder = {
      userId,
      items,
      amount,
      address: {
        street: address.street || "Unknown Street",
        city: address.city || "Unknown City",
        postalCode: address.postalCode || "00000",
      },
      status,
      payment,
    };

    // Logging de la commande (pour le débogage)
    console.log("Nouvelle commande créée : ", newOrder);

    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};
	const update = async (email, password) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${url}/api/user/update`,
				{ email, password },
				{ headers: { token } }
			);
			if (response.data.success) {
				toast.success("Compte mis à jour avec succès");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error updating:", error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 5000);
		}
	};

	// const order = async (cartItems) => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await axios.post(
	// 			`${url}/api/cart/order`,
	// 			{
	// 				userId : currentUser.userId,
	// 				items : cartItems
	// 			},
	// 			{ headers: { token } }
	// 		);
	// 		if (response.data.success) {
	// 			toast.success("Commande passée avec succès");
	// 		} else {
	// 			toast.error(response.data.message);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error ordering:", error);
	// 	} finally {
	// 		setTimeout(() => {
	// 			setLoading(false);
	// 		}, 5000);
	// 	}
	// };

	const fetchOrders = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${url}/api/v1/orders`, {
				headers: { token },
			});
			if (response.data.success) {
				console.log("Orders:", response.data.orders);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error fetching orders:", error);
		} finally {
			setLoading(false);
		}
	};
	const validerCommande = async () => {
		setLoading(true);
		try {
			// Example usage
			if (!currentUser) {
				toast.error("Veuillez vous connecter pour passer une commande");
				return;
			}
			console.log("cartItems", cartItems);
			console.log("currentUser", currentUser);
			const userId = currentUser.userId;
			const address = currentUser.address;
			const status = "Pending";
			const payment = true;

			const order = createOrder(
				{
					userId : userId,
					cartItems: cartItems,
					address: address,
					status: status,
					payment: payment
				});
			console.log("order", order);
			const response = await axios.post(
				`${url}/api/v1/orders`,
				{ order },
				{
					headers: {
						Autorization: `Bearer ${localStorage.getItem("token")}`,
					}
				}

			);
			console.log("response", response);
			if (response.status === 200) {
				setCartItems({});
				toast.success("Commande passée avec succès");
			}else {
				throw new Error("Error ordering");
			}
		} catch (error) {
			console.error("Error ordering:", error);
		} finally {
			setLoading(false);
		}
	};
	//getCurrentUser and return users
	const getCurrentUser = async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem("token");

			if (!token) {
				toast.error("Token is missing");
				throw new Error("Token is missing");
			}

			setToken(token);

			const response = await fetch(`${url}/api/v1/auth/user`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				console.log("User data:", data.user);
				console.log("Current user:", currentUser);
				return data.user;
			}else {
				throw new Error("Error getting user");
			}


		} catch (error) {
			console.error("Error getting user:", error.message);
			toast.error(
				"Une erreur est survenue lors de la récupération de l'utilisateur"
			);
			return null;
		} finally {
			setLoading(false);
		}
	};


	const getOrders = async () => {
		//getCurrentUser
		const response = await getCurrentUser();
		if (!response) {
			console.log("response", response);
			return;
		}
		//userId
		if (!currentUser) {
			toast.error("Veuillez vous connecter pour voir vos commandes");
			return;
		}
		const userId = currentUser.userId;
		console.log("userId", userId);
		try {
			const response = await axios.post(
				`${url}/api/v1/orders/userorders`,
				{
					"userId " : userId,
				},
				{
					headers: {
						token,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.status === 200) {
				console.log("Orders:", response.data.orders);
				setOrders(response.data.orders);
			}else {
				throw new Error("Error getting orders");
			}
		} catch (error) {
			console.error("Error getting orders:", error);
			toast.error("Veuiilez vous connecter pour voir vos commandes");
			setLoading(false);
		}
	};

	const contextValue = {
		foodList,
		saladeTypesListe,
		saladeSauce,
		saladeSupplementaire,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		deleteFromCart,
		url,
		token,
		loading,
		totalPrice,
		currentUser,
		setCurrentUser,
		validerCommande,
		loginUser,
		register,
		Orders,
		setOrders,
		fetchOrders,
		logout,
		update,
		createOrder,
		setLoading,

		getOrders,
		getCurrentUser,

		isAuthenticated,
		openModalHandle,
		isModalOpen,
		modalChildren,
		setModalChildren,
	};
	const fetchFoodList = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${url}/api/v1/foods`);
			if (response.data.success) {
				console.log("food_list", response.data.data); // Use the fetched data directly
				setFoodList(response.data.data);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error fetching food list:", error);
		} finally {
			setLoading(false);
		}
	};
	// loadCartData
	const loadCartData = async (token) => {
		setLoading(true);
		try {
			const response = await axios.get(`${url}/api/v1/cart`, {
				headers: { token },
			});
			if (response.data.success) {
				console.log("cartItems", response.data.data);
				setCartItems(response.data.data);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error loading cart data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		async function loadData() {
			console.log("call loadData ");
			await fetchFoodList();
			if (localStorage.getItem("token")) {
				console.log("token exist"+localStorage.getItem("token"));
				setToken(localStorage.getItem("token"));
				// await loadCartData(localStorage.getItem("token"));
			}else {
				console.log("no token");
			}
		}
		// verify user auth
		async function verifyUser() {
			const response = await verify();
		}

		verifyUser();
		loadData();
	}, []);
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
