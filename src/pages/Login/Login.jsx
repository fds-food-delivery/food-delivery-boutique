import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { StoreContext } from "./../../context/StoreContext";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const {
		cartItems, addToCart, removeFromCart,
		loginUser, // Fonction pour connect
	} = useContext(StoreContext);

	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser(username, password);
			toast.success("Connexion réussie");
			// navigate("/");
		} catch (error) {
			toast.error("Erreur lors de la connexion");
			console.error("Erreur lors de la connexion", error);
		}
	};



	return (
		<div className="login-page">
			<div className="login-container">
				<div className="login-banner">
					<p>Connectez-vous pour accéder à notre application</p>
				</div>
				<form onSubmit={loginHandler} className="login-form">
					<div className="form-group">
						<label htmlFor="username">Téléphone</label>
						<input
							type="text"
							placeholder="Entrez votre numéro de téléphone"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Mot de passe</label>
						<input
							type="password"
							id="password"
							placeholder="Entrez votre mot de passe"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="login-button">
						Se connecter
					</button>
				</form>

			</div>
		</div>
	);
};

export default LoginPage;
