import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

import Panier from "../../pages/Panier/Panier";
import { useNavigate } from "react-router-dom";
import { AlertPanier } from "../Alert/AlertPanier";

import { toast } from "react-toastify";

const Navbar = () => {
	// recupere le path url
	const path = window.location.pathname;
	//capitalize le path
	const pathCapitalize = path.charAt(1).toUpperCase() + path.slice(2);
	const [menu, setMenu] = useState(path === "/" ? "Accueil" : pathCapitalize);
	const [isFixed, setIsFixed] = useState(false);
	const [isPanierOpen, setIsPanierOpen] = useState(false);

	const { isShowAlertPanier } = useContext(StoreContext);

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
			<p className="navbar-title text-red">Restaurant</p>
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
				{/*{currentUser ? (*/}
				{/*	<div className="navbar-user">*/}
				{/*		<span>{currentUser.displayName || currentUser.email}</span>*/}
				{/*		<button className="logout-button" onClick={handleLogout}>*/}
				{/*			Déconnexion*/}
				{/*		</button>*/}
				{/*	</div>*/}
				{/*) : (*/}
				{/*	<button*/}
				{/*		className="login-button"*/}
				{/*		onClick={() => {*/}
				{/*			setMenu("");*/}
				{/*			navigate("/login");*/}
				{/*		}}>*/}
				{/*		Connexion*/}
				{/*	</button>*/}
				{/*)}*/}

				{currentUser ? (
					<div className="navbar-user">
						<span>{currentUser.displayName || currentUser.email}</span>
						<button className="logout-button" onClick={handleLogout}>
							Déconnexion
						</button>
					</div>
				) : (
					<button
						className="login-button"
						onClick={() => {
							setMenu("");
							navigate("/login");
						}}>
						<i className="fas fa-user"></i>
					</button>
				)}
			</div>
			{isPanierOpen && <Panier onClose={togglePanier} />}
			{isShowAlertPanier && <AlertPanier message="Produit ajouté au panier" />}
		</div>
	);
};

export default Navbar;
