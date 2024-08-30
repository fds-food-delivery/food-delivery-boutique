import { createContext, useEffect, useState } from "react";
import axios from "axios";
import food_25 from "../assets/food_25.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [openModalValidatedHandle, setOpenModalValidatedHandle] =
		useState(false);
	const [openModalErrorHandle, setOpenModalErrorHandle] = useState(false);
	const [openModalValiderHandle, setOpenModalValiderHandle] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [cartItems, setCartItems] = useState({});
	const [foodList, setFoodList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [orders, setOrders] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalChildren, setModalChildren] = useState(null);
	const navigate = useNavigate();
	// const url = "https://d3pbaiuhrdo7r5.cloudfront.net";
	const url = "http://localhost:5000";
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
		address = {},
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
				address: {
					street: address.street || "Unknown Street",
					city: address.city || "Unknown City",
					postalCode: address.postalCode || "00000",
				},
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

	const creerCompte = async (name, phone, address, city) => {
		try {
			const user = {
				name: name,
				phone: phone,
				fullName: name,
				address: address,
				city: city,
			};
			const response = await axios.post(`${url}/api/v1/auth/users`, user);
			if (response.status === 200 || response.status === 201) {
				return response.data.userId;
			} else {
				throw new Error("Error creating account");
			}
		} catch (error) {
			console.error("Error creating account:", error);
			throw error;
		}
	};

	const validerCommande = async (name, phone, address, city) => {
		try {
			const userId = await creerCompte(name, phone, address, city);
			console.log("cartItems", cartItems);
			const order = createOrder({
				userId: userId,
				cartItems: cartItems,
				address: address,
				status: "Pending",
				payment: selectedPayment,
			});
			console.log("order", order);
			const response = await axios.post(`${url}/api/v1/orders`, order);
			console.log("response", response);
			console.log("response.data", response.data);
			if (response.status === 200 || response.status === 201) {
				setCartItems({});
				setLoading(false);
				return true;
			} else {
				throw new Error("Error ordering");
			}
		} catch (error) {
			console.error("Error ordering:", error);
			setLoading(false);
			return false;
		}
	};

	const getOrdersByCurrentUser = async () => {
		setLoading(true);
		const userId = currentUser.userId;
		try {
			const response = await axios.post(
				`${url}/api/v1/orders/userorders`,
				{ userId },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
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

	const loadCartData = async (token) => {
		setLoading(true);
		try {
			const response = await axios.get(`${url}/api/v1/cart`, {
				headers: { token },
			});
			if (response.status === 200 || response.status === 201) {
				console.log("cartItems", response.data.data);
				setCartItems(response.data.data);
				setLoading(false);
			} else {
				throw new Error("Error loading cart data");
			}
		} catch (error) {
			console.error("Error loading cart data:", error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		async function loadData() {
			setLoading(true);
			console.log("call loadData ");
			await fetchFoodList();
			if (localStorage.getItem("token")) {
				console.log("token exist" + localStorage.getItem("token"));
				setToken(localStorage.getItem("token"));
				// await loadCartData(localStorage.getItem("token"));
			} else {
				console.log("no token");
			}
		}
		loadData();
	}, []);

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
		orders,
		setOrders,
		fetchOrders,
		update,
		createOrder,
		setLoading,
		getOrders: getOrdersByCurrentUser,
		openModalValidatedHandle,
		setOpenModalValidatedHandle,
		openModalErrorHandle,
		setOpenModalErrorHandle,
		handleConfirmedOrder,
		openModalValiderHandle,
		setOpenModalValiderHandle,
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
};

export default StoreContextProvider;
