import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import food_25 from "../assets/food_25.png";
import { toast } from "react-toastify";
import {
	salade_sauce,
	salade_supplementaire,
	salade_types_liste,
} from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [cartItems, setCartItems] = useState({});
	const [token, setToken] = useState("");
	// const url = "http://kend-food-ordering.onrender.com";
	const url = "http://localhost:4000";
	const [foodList, setFoodList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [Orders, setOrders] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

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
			toast.error("Votre plat a déjà été ajouté au panier");
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


	const loginUser = async (username, password) => {
		try {
			const response = await axios.post(`${url}/api/v1/auth/login`, {
				username: username,
				password : password
			});
			if (response.data.success) {
				console.log("response", response.data);
				setToken(response.data.token);
				setCurrentUser(response.data.user);
				setIsAuthenticated(true);
				toast.success("Vous êtes connecté");
			} else {
				toast.error(response.data.message);
				console.log("response", response.data);
			}
		} catch (error) {
			console.error("Error logging in:", error);
		} finally {
			setLoading(false);
		}
	};

	const register = async (email, password) => {
		setLoading(true);
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
				`${url}/api/user/logout`,
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				localStorage.removeItem("token");
				setToken("");
				setIsAuthenticated(false);
				toast.success("Vous êtes déconnecté");
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
		setLoading(true);
		const token = localStorage.getItem("token");
		try {
			const response = await axios.post(
				`${url}/api/v1/auth/verify`,
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		} catch (error) {
			console.error("Error verifying:", error);
		} finally {
			setLoading(false);
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
			setLoading(false);
		}
	};

	const order = async (cartItems) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${url}/api/cart/order`,
				{ cartItems },
				{ headers: { token } }
			);
			if (response.data.success) {
				toast.success("Commande passée avec succès");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error ordering:", error);
		} finally {
			setLoading(false);
		}
	};

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
	}
	const validerCommande = async () => {

		setLoading(true);
		try {
			const response = await axios.post(
				`${url}/api/v1/orders`,
				{ cartItems },
				{ headers: { token } }
			);
			if (response.data.success) {
				toast.success("Commande passée avec succès");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error ordering:", error);
		} finally {
			setLoading(false);
		}
	}

	const getOrders = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${url}/api/v1/orders`,
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				console.log("Orders:", response.data.data);
				setOrders(response.data.data);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error getting orders:", error);
		} finally {
			setLoading(false);
		}
	};



	useEffect(() => {
		console.log(cartItems);
	}, [cartItems]);

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
		order,
		getOrders,
		isAuthenticated,
	};
	const fetchFoodList = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${url}/api/v1/foods`);
			console.log("food_list", response.data.data); // Use the fetched data directly
			setFoodList(response.data.data);
		} catch (error) {
			console.error("Error fetching food list:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		async function loadData() {
			console.log("call loadData ");
			await fetchFoodList();
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
				await loadCartData(localStorage.getItem("token"));
			}
		}
		loadData();
	}, []);
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
