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

	const url = "backend-food-ordering.onrender.com";
	const [token, setToken] = useState("");
	const [food_list, setFoodList] = useState([]);
	const [loading, setLoading] = useState(false);

	// isShowAlert

	const [isShowAlertPanier, setIsShowAlertPanier] = useState(false);

	//
	// const [salade_types_liste, setSaladeTypesListe] = useState([
	// 	"Laitue",
	// 	"Roquette",
	// 	"Chou frisé",
	// 	"Laitue",
	// 	"Roquette",
	// 	"Chou frisé",
	// ]);
	// const [salade_sauce, setSaladeSauce] = useState([
	// 	"Vinaigrette",
	// 	"Ranch",
	// 	"Sauce César",
	// 	"Vinaigrette",
	// 	"Ranch",
	// 	"Sauce César",
	// ]);
	// const [salade_supplementaire, setSaladeSupplementaire] = useState([
	// 	"Croutons",
	// 	"Fromage",
	// 	"Bacon",
	// 	"Croutons",
	// 	"Fromage",
	// 	"Bacon",
	// ]);

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

	// const addToCart = (itemId) => {
	// 	if (!cartItems[itemId]) {
	// 		setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
	// 	} else {
	// 		console.log(itemId + " added");

	// 		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
	// 		setIsShowAlertPanier(true);
	// 	}
	// };

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
			// setIsShowAlertPanier(true); // Activer l'alerte
		} else {
			toast.error("Votre plat a déjà été ajouté au panier");
			// setIsShowAlertPanier(true); // Activer l'alerte
			setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
		}
	};
	// const closeAlert = () => {
	// setIsShowAlertPanier(false); // Désactiver l'alerte
	// };

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

	useEffect(() => {
		console.log(cartItems);
	}, [cartItems]);

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
		isShowAlertPanier,
		url,
		token,
		loading,
		// closeAlert,
		totalPrice,
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
