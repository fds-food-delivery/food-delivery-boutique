import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil";
import Panier from "./pages/Panier/Panier";
import Commande from "./pages/Commande/Commande";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AlertPanier } from "./components/Alert/AlertPanier";
import OrderState from "./pages/Livraison/OrderState";
import Contact from "./pages/Contact/Contact";
import { ToastContainer } from "react-toastify";

const App = () => {
	return (
		<>
			<div className="app">
				<Navbar />
				<ToastContainer />
				<Routes>
					<Route path="/" element={<Accueil />} />
					<Route path="/panier" element={<Panier />} />
					<Route path="/commande" element={<Commande />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/livraison" element={<OrderState />} />
					{/* Contact */}
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</div>
			<Footer />
			{/* {true && <AlertPanier message="Votre plat a été ajouté au panier" />} */}
		</>
	);
};

export default App;
