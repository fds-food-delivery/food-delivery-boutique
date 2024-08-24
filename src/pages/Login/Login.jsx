import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "./../../context/StoreContext";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { loginUser, isAuthenticated } = useContext(StoreContext);

	const loginHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const reponse = await loginUser(username, password);
			if (reponse) {
				toast.success("Connexion réussie");
				navigate("/");
			} else {
				toast.error("Erreur lors de la connexion");
			}
		} catch (error) {
			toast.error("Erreur lors de la connexion");
		} finally {
			setLoading(false);
		}
	};

	if (isAuthenticated) {
		navigate("/");
	}

	return (
		<div className="login-page" style={{ backgroundImage: `url("https://www.shutterstock.com/shutterstock/photos/2278053615/display_1500/stock-photo-french-fries-burgers-and-other-fast-food-as-background-top-view-2278053615.jpg")` }}>
			<div className="login-container">
				<div className="login-banner">
					<p>Connectez-vous </p>
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
							disabled={loading}
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
							disabled={loading}
						/>
					</div>
					<button type="submit" className="login-button" disabled={loading}>
						{loading ? (
							<div className="button-loader"></div>
						) : (
							"Se connecter"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
