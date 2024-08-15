import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

import Panier from "../../pages/Panier/Panier";
import { useNavigate } from "react-router-dom";

import { FaUser } from 'react-icons/fa';




import { toast } from "react-toastify";

const Navbar = () => {
	// recupere le path url
	const path = window.location.pathname;
	//capitalize le path
	const pathCapitalize = path.charAt(1).toUpperCase() + path.slice(2);
	const [menu, setMenu] = useState(path === "/" ? "Accueil" : pathCapitalize);
	const [isFixed, setIsFixed] = useState(false);
	const [isPanierOpen, setIsPanierOpen] = useState(false);
	// isAuthentified
	const [isAuthentified, setIsAuthentified] = useState(true);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const { cartItems } = useContext(StoreContext);
	const { currentUser, logout } = useContext(StoreContext);
	const navigate = useNavigate();
	const totalItems = cartItems
		? Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)
		: 0;

	const handleNavigate = () => {
		setMenu("Menu");
		navigate("/#explore-menu");
		setTimeout(() => {
			const element = document.getElementById("explore-menu");
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
				element.focus();
			}
		}, 100); // Délai pour s'assurer que la navigation est terminée
	};

	const togglePanier = () => {
		setIsPanierOpen(!isPanierOpen);
	};


	const handleProfileClick = () => {
		history.push('/profil'); // Naviguer vers la page de profil
		setIsUserMenuOpen(false); // Fermer le menu après avoir cliqué sur le profil
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<div className={`navbar ${isFixed ? "fixed" : ""}`}>
			<img src={assets.logo} alt="" className="logo" />

			<ul className="navbar-menu">
				<li
					onClick={() => {
						setMenu("Accueil");
						navigate("/");
					}}
					className={menu === "Accueil" ? "active" : ""}>
					Accueil
				</li>
				<li
					onClick={handleNavigate}
					className={menu === "Menu" ? "active" : ""}>
					Menu
				</li>
				<li
					onClick={() => {
						setMenu("Livraison");
						navigate("/livraison");
					}}
					className={menu === "Livraison" ? "active" : ""}>
					Livraison
				</li>
				<li
					onClick={() => {
						setMenu("Contact");
						navigate("/contact");
					}}
					className={menu === "Contact" ? "active" : ""}>
					Contact
				</li>
			</ul>
			<div className="navbar-right">
				<img src={assets.search_icon} alt="" />
				<div className="navbar-search-icon" onClick={togglePanier}>
					<img src={assets.basket_icon} alt="" />
					{totalItems > 0 && <div className="dot">{totalItems}</div>}
				</div>


				{isAuthentified ? (
					<div className="relative">
						<div className="navbar-user flex items-center cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
							<FaUser size={50} color="#f86c6b" className="text-red-500 text-5xl hover:text-red-700 hover:shadow-lg transition duration-300 ease-in-out" />
						</div>
						{isUserMenuOpen && (
							<div className="user-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
								<button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleProfileClick}>Profil</button>
								<button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Déconnexion</button>
							</div>
						)}
					</div>
				) : (
					<button className="login-button" onClick={() => navigate("/login")}>
						<i className="fas fa-user"></i>
					</button>
				)}
			</div>
			{isPanierOpen && <Panier onClose={togglePanier} />}
		</div>
	);
};

export default Navbar;
