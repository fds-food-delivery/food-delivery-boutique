import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../../store/useStore";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // NOTE: registerUser n'existait pas dans l'ancien StoreContext (page déjà
    // non routée dans App.jsx) — non repris ici, pré-existant.
    const { registerUser } = useStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }
        setLoading(true);
        try {
            const response = await registerUser(credentials.username, credentials.email, credentials.password);
            if (response) {
                toast.success("Inscription réussie");
                navigate("/login");
            } else {
                toast.error("Erreur lors de l'inscription, veuillez réessayer");
            }
        } catch (error) {
            toast.error("Erreur de serveur, veuillez réessayer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container register-page">
            <div className="row register-container">
                <div className="register-banner col-10">
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
                <form onSubmit={registerHandler} className="register-form">
                    <div className="row">
                        <div className="form-group col-6">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Téléphone"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                aria-label="Numéro de téléphone"
                            />
                        </div>
                        <div className="form-group col-6">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                aria-label="Adresse email"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Mot de passe"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                aria-label="Mot de passe"
                            />
                        </div>
                        <div className="form-group col-6">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirmer le mot de passe"
                                value={credentials.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                aria-label="Confirmation du mot de passe"
                            />
                        </div>
                    </div>
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? <div className="button-loader"></div> : "S'inscrire"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
