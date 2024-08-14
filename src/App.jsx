
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil";
import Panier from "./pages/Panier/Panier";
import Commande from "./pages/Commande/Commande";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/Login/Login";
import OrderState from "./pages/Livraison/OrderState";
import Contact from "./pages/Contact/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<div className="app">
				<Navbar />
				<ToastContainer closeButton="{false}" position="bottom-right" />
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
