import React, { useState } from "react";
import "./RegistrationPage.css";

const RegistrationPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		// Logique d'inscription ici
		console.log("Username:", username);
		console.log("Email:", email);
		console.log("Password:", password);
	};

	return (
		<div className="registration-page">
			<h2>Inscription</h2>
			<form onSubmit={handleRegister} className="registration-form">
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
					<label htmlFor="email">Adresse e-mail</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
				<button type="submit" className="registration-button">
					S'inscrire
				</button>
			</form>
		</div>
	);
};

export default RegistrationPage;
