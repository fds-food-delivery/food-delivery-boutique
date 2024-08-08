import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		// Logique de connexion ici
		console.log("Username:", username);
		console.log("Password:", password);
	};

	const handleGoogleLogin = async () => {
		try {
			await signInWithPopup(auth, provider);
			navigate("/"); // Redirige vers la page d'accueil après la connexion réussie
		} catch (error) {
			console.error("Erreur lors de la connexion avec Google", error);
		}
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<div className="login-banner">
					<p>Connectez-vous pour accéder à notre application</p>
				</div>
				<form onSubmit={handleLogin} className="login-form">
					<div className="form-group">
						<label htmlFor="username">Nom d'utilisateur</label>
						<input
							type="text"
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="login-button">
						Se connecter
					</button>
				</form>
				<button className="google-login-button" onClick={handleGoogleLogin}>
					<img
						src="https://img.icons8.com/color/48/000000/google-logo.png"
						alt="Google logo"
					/>
					Connexion avec Google
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
