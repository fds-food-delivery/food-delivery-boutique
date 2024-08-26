import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "./../../context/StoreContext";
// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const LoginPage = () => {
	const [credentials, setCredentials] = useState({ username: "", password: "" });
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { loginUser, isAuthenticated } = useContext(StoreContext);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const loginHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await loginUser(credentials.username, credentials.password);
			if (response) {
				toast.success("Connexion réussie");
				navigate("/");
			} else {
				toast.error("Nom d'utilisateur ou mot de passe incorrect");
			}
		} catch (error) {
			toast.error("Erreur de connexion, veuillez réessayer");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container login-page">
			<div className="row login-container">
				<div className="login-banner col-12">
					<div className="row">
						<div className="col-6 login-tab">
							<Link to="/login">
								<p>Connexion</p>
							</Link>
						</div>
						<div className="col-6 register-tab">
							<Link to="/register">
								<p>Inscription</p>
							</Link>
						</div>
					</div>
				</div>
				<form onSubmit={loginHandler} className="login-form row">
					<div className="form-group row">
						<input
							className="col-12"
							type="text"
							name="username"
							placeholder="Téléphone"
							value={credentials.username}
							onChange={handleChange}
							required
							disabled={loading}
							aria-label="Numéro de téléphone"
						/>
					</div>
					<div className="form-group row">
						<input
							className="col-12"
							type="password"
							name="password"
							placeholder="Mot de passe"
							value={credentials.password}
							onChange={handleChange}
							required
							disabled={loading}
							aria-label="Mot de passe"
						/>
					</div>
					<button type="submit" className="login-button col-12" disabled={loading}>
						{loading ? <div className="button-loader"></div> : "Se connecter"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
