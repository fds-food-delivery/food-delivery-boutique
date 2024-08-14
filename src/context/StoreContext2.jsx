import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import food_25 from "../assets/food_25.png";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [cartItems, setCartItems] = useState({});
	const url1 = "backend-food-ordering.onrender.com";
	const url = "http://localhost:4000";
	const [token, setToken] = useState("");
	const [food_list, setFoodList] = useState([]);

	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [isAuthentified, setIsAuthentified] = useState(false);

	const [salade_types_liste, setSaladeTypesListe] = useState([
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
		// Ajoutez d'autres types de salade ici
	]);

	const [salade_sauce, setSaladeSauce] = useState([
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
		// Ajoutez d'autres sauces ici
	]);

	const [salade_supplementaire, setSaladeSupplementaire] = useState([
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
		// Ajoutez d'autres condiments ici
	]);
	const totalPrice = () => {
		return Object.keys(cartItems).reduce((acc, id) => {
			const item = food_list.find((food) => food._id === id);
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

	//deletefromcart
	const deleteFromCart = (itemId) => {
		const newCartItems = { ...cartItems };
		delete newCartItems[itemId];
		setCartItems(newCartItems);
	};









	const fetchFoodList = async () => {
		setLoading(true);
		try {
			const response = await axios.get("https://backend-food-ordering.onrender.com/api/food/list");
			console.log("food_list", response.data.data); // Use the fetched data directly
			setFoodList(response.data.data);
		} catch (error) {
			console.error("Error fetching food list:", error);
		} finally {
			setLoading(false);
		}
	};

	const loadCartData = async (token) => {
		setLoading(true);
		try {
			const response = await axios.post(
				url + "/api/cart/get",
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				setCartItems(response.data.cartData);
			} else {
				console.log("response.data", response.data);
			}
			// setCartItems(response.data.cartData);
		} catch (error) {
			console.error("Error loading cart data:", error);
		} finally {
			setLoading(false);
		}
	};

	const loginUser = async (email, password) => {
		try {
			const response = await axios.post(`${url}/api/user/login`, {
				email,
				password,
			});
			if (response.data.success) {
				setToken(response.data.token);
				setIsAuthentified(true);
				toast.success("Vous êtes connecté");
			} else {
				toast.error(response.data.message);
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
				setIsAuthentified(false);
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
		try {
			const response = await axios.post(
				`${url}/api/user/verify`,
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				setIsAuthentified(true);
			} else {
				setIsAuthentified(false);
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

	// order
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
	const getOrders = async () => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${url}/api/cart/orders`,
				{},
				{ headers: { token } }
			);
			if (response.data.success) {
				console.log("Orders:", response.data.orders);
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




	useEffect(() => {
		async function loadData() {
			console.log("call loadData ");
			await fetchFoodList();
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
				await loadCartData(localStorage.getItem("token"));
			}
		}
		async function verifyUser() {
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
				await verify();
			}
		}

		loadData();
		verifyUser();

	}, []);

	const contextValue = {
		food_list,
		salade_types_liste,
		salade_sauce,
		salade_supplementaire,
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
		loginUser,
		register,
		logout,
		update,
		order,
		getOrders,
		isAuthentified,

	};

	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
