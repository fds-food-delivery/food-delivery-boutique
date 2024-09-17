import { createContext, useEffect, useState } from "react";
import axios from "axios";
import food_25 from "../assets/food_25.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import {menu_list} from "../assets/assets.js";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [openModalValidatedHandle, setOpenModalValidatedHandle] =
		useState(false);
	const [openModalErrorHandle, setOpenModalErrorHandle] = useState(false);
	const [openModalValiderHandle, setOpenModalValiderHandle] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [cartItems, setCartItems] = useState({});
	const [totalNotifications, setTotalNotifications] = useState(0);
	const [foodList, setFoodList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [notifications, setNotifications] = useState([]);

	const StateType = [
		{ value: 'PENDING', name: 'En attente' },
		{ value: 'IN_PROGRESS', name: 'En cours' },
		{ value: 'DELIVERED', name: 'Livré' },
		{ value: 'CANCELLED', name: 'Annulée' }
	];

	const [orders, setOrders] = useState([]);
	const [userID, setUserID] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalChildren, setModalChildren] = useState(null);
	const [menu_list , setMenu_list] = useState([]);
		useNavigate();
		// const url = "https://d3pbaiuhrdo7r5.cloudfront.net";
		// const url = "http://localhost:5000";

		const url ="https://backend-food-ordering.onrender.com";
		const urlS3 = "https://foods-24.s3.us-east-1.amazonaws.com/foods";
		const fetchNotifications = async () => {
			setLoading(true);
			try {
				if (localStorage.getItem("userID")) {
					setUserID(localStorage.getItem("userID"));
					console.log("userID:", userID);
					const response = await axios.get(`${url}/api/v1/notifications?userId=${userID}`);
					if (response.status === 200 || response.status === 201) {
						console.log("Notifications:", response.data);
						setNotifications(response.data);
					} else {
						throw new Error("Error fetching notifications");
					}
				}

			} catch (error) {
				console.error("Error fetching notifications:", error);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		}

		const handleConfirmedOrder = async () => {
			const reponse = await validerCommande();
			if (reponse) {
				setOpenModalValiderHandle(false);
				setOpenModalValidatedHandle(true);
			} else {
				setOpenModalValiderHandle(false);
				setOpenModalErrorHandle(true);
			}
		};
		const fetchCategoriesList =  async () =>{
			setLoading(true);
			const response = await axios.get(`${url}/api/v1/categories`);
			if (response.status === 200 || response.status === 201) {
				setMenu_list(response.data.data);
			} else {
				setLoading(false);
			}
		}


		const openModalHandle = (children) => {
			setIsModalOpen(true);
			setModalChildren(children);
		};

		const [saladeSauce] = useState([
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

		const [saladeSupplementaire] = useState([
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

		const createOrder = ({
								 userId,
								 cartItems,
								 address,
								 status = "Pending",
								 payment = false,
							 }) => {
			try {
				if (!userId) {
					throw new Error("L'ID de l'utilisateur est manquant.");
				}
				if (!cartItems || Object.keys(cartItems).length === 0) {
					throw new Error("Le panier est vide ou manquant.");
				}

				const items = Object.keys(cartItems).map((itemId) => {
					const item = foodList.find((food) => food._id === itemId);
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

				const amount = items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);

				const newOrder = {
					userId,
					items,
					amount,
					address,
					status,
					payment,
				};

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

		const fetchOrders = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${url}/api/v1/orders`);
				if (response.data.success) {
					setLoading(false);
					console.log("Orders:", response.data.orders);
				} else {
					setLoading(false);
					toast.error(response.data.message);
				}
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		const formatUserData = (fullName, phone, address) => {
			return {
				username: phone,
				fullName: fullName,
				address: address,
				phone: phone
			};
		};

		const creerCompte = async (fullName, phone, address) => {
			try {
				const newUser = formatUserData(fullName, phone, address);
				console.log("user", newUser);

				// Utilisation des vraies variables
				const response = await axios.post(`${url}/api/v1/auth/users`, {
					username: newUser.phone, // Utilisation du numéro de téléphone comme nom d'utilisateur
					fullName: newUser.fullName,
					address: newUser.address,
					phone: newUser.phone
				});

				if ([200, 201, 400, 409].includes(response.status)) {
					console.log("User created:", response.data);
					localStorage.setItem("userID", response.data.user._id);
					return response.data;
				} else {
					console.log("User not created:", response.data);
				}
			} catch (error) {
				console.error("Error creating account:", error);
				throw error;
			}
		};


		const validerCommande = async (fullName, phone, address) => {
			try {
				console.log("Démarrage de la validation de la commande...");

				// Création de l'utilisateur
				console.log("Création de l'utilisateur avec les informations :");
				console.log("Nom :", fullName);
				console.log("Téléphone :", phone);
				console.log("Adresse :", address);

				const newUserId = await creerCompte(fullName, phone, address);

				if (!newUserId || !newUserId.user._id) {
					throw new Error("Impossible de créer l'utilisateur.");
				}
				const userID = newUserId.user._id;
				localStorage.setItem("userID", userID);
				setUserID(userID);
				console.log("Utilisateur créé avec ID:", userID);
				if  (newUserId.user._id) {
					// Création de la commande
					const order = createOrder({
						userId: userID,
						cartItems: cartItems,
						address: address,
						status: "Pending",
						payment: selectedPayment,
					});

					console.log("Création de la commande pour l'utilisateur:", userID);
					console.log("Détails de la commande :", order);
					// verifie la promesse de creerCompte est resolue

					// Envoi de la commande à l'API

					const response = await axios.post(`${url}/api/v1/orders`, order);

					console.log("Réponse de la création de commande :", response);

					if (response.status === 200 || response.status === 201) {
						console.log("Commande créée avec succès !");
						setCartItems([]);  // Réinitialiser le panier après la commande
						setLoading(false);
						return true;
					} else {
						throw new Error("Erreur lors de la création de la commande.");
					}
				}else{
					throw new Error("Erreur lors de la création de l'utilisateur.");
				}
			} catch (error) {
				console.error("Erreur lors de la validation de la commande :", error);
				setLoading(false);
				return false;
			}
		};
		const validerCommande2 = async (fullName, phone, address) => {
			try {
				console.log("Démarrage de la validation de la commande...");

				// Création de l'utilisateur
				console.log("Création de l'utilisateur avec les informations :");
				console.log("Nom :", fullName);
				console.log("Téléphone :", phone);
				console.log("Adresse :", address);

				const newUserId = await creerCompte(fullName, phone, address);

				if (!newUserId || !newUserId.user._id) {
					throw new Error("Impossible de créer l'utilisateur.");
				}

				const userID = newUserId.user._id;
				localStorage.setItem("userID", userID);
				setUserID(userID);
				console.log("Utilisateur créé avec ID:", userID);

				// Création de la commande
				const order = createOrder({
					userId: userID,
					cartItems: cartItems,
					address: address,
					status: "Pending",
					payment: selectedPayment,
				});

				console.log("Création de la commande pour l'utilisateur:", userID);
				console.log("Détails de la commande :", order);

				// Envoi de la commande à l'API
				const response = await axios.post(`${url}/api/v1/orders`, order);

				console.log("Réponse de la création de commande :", response);

				if (response.status === 200 || response.status === 201) {
					console.log("Commande créée avec succès !");
					setCartItems([]);  // Réinitialiser le panier après la commande
					setLoading(false);
					return true;
				} else {
					throw new Error("Erreur lors de la création de la commande.");
				}
			} catch (error) {
				console.error("Erreur lors de la validation de la commande :", error);
				setLoading(false);
				return false;
			}
		};


		const getOrdersByCurrentUser = async () => {
			setLoading(true);
			if (localStorage.getItem("userID")) {
				setUserID(localStorage.getItem("userID"));
			}
			try {
				const response = await axios.post(
					`${url}/api/v1/orders/userorders`,
					{
						userId : userID
					}
				);

				if (response.status === 200 || response.status === 201) {
					console.log("Orders:", response.data);
					const orders1 = response.data;
					setOrders(orders1);
					return orders1;
				} else {
					throw new Error("Error getting orders");
				}
			} catch (error) {
				console.error("Error getting orders:", error);
				throw error;
			} finally {
				setLoading(false);
			}
		};

		const fetchFoodList = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`${url}/api/v1/foods`);
				if (response.status === 200 || response.status === 201) {
					console.log("food_list", response.data.data);
					setFoodList(response.data.data);
					setLoading(false);
				} else {
					setLoading(false);
					throw new Error("Verifiez votre connexion internet");
				}
			} catch (error) {
				console.error("Error fetching food list:", error);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		useEffect(async () => {
			async function loadData() {
				setLoading(true);

				await fetchFoodList();
				await fetchCategoriesList();
				setLoading(false);
			}

			loadData();
			console.log("Current User: ", userID);
			const getOrderByUser = async () => {
				await getOrdersByCurrentUser();
			}
			getOrderByUser();
			setTotalNotifications(notifications.length);
		}, [userID, notifications.length]);

		const contextValue = {
			foodList,
			saladeSauce,
			saladeSupplementaire,
			cartItems,
			setCartItems,
			addToCart,
			removeFromCart,
			deleteFromCart,
			url,

			loading,
			totalPrice,
			currentUser,
			setCurrentUser,
			validerCommande,
			notifications,
			orders,
			menu_list,
			setOrders,
			fetchOrders,
			update,
			fetchCategoriesList,
			createOrder,
			setLoading,
			getOrders: getOrdersByCurrentUser,
			StateType,
			openModalValidatedHandle,
			setOpenModalValidatedHandle,
			openModalErrorHandle,
			setOpenModalErrorHandle,
			handleConfirmedOrder,
			openModalValiderHandle,
			urlS3,
			setOpenModalValiderHandle,
			userID,
			setUserID,
			totalNotifications,
			setTotalNotifications,
			selectedPayment,
			setSelectedPayment,
			openModalHandle,
			isModalOpen,
			modalChildren,
			setModalChildren,
		};

		return (
			<StoreContext.Provider value={contextValue}>
				{props.children}
			</StoreContext.Provider>
		);
	}
;

export default StoreContextProvider;
