// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Accueil/Home.jsx";
import Panier from "./pages/Panier/Panier";
import Footer from "./components/Footer/Footer";
import OrderState from "./pages/Livraison/OrderState";
import Apropos from "./pages/Contact/Apropos.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyLoader from "./Loader/MyLoader";
import { useEffect, useState } from "react";

import Navbar3 from "./components/Navbar/Navbar3";
import "./App.css";
import ScrollToTop from "react-scroll-to-top";
import { useStore, initStore } from "./store/useStore";
import UserProfile from "./components/Profile/UserProfile.jsx";
import NotificationAllList from "./components/NotificationAllList/NotificationAllList.jsx";

const App = () => {
	const { loading, setLoading } = useStore();

	const [loadingApp, setLoadingApp] = useState(true);

	useEffect(() => {
		initStore();
	}, []);

	useEffect(() => {
		if (loading === false) {
			// Simuler un délai de chargement
			setTimeout(() => {
				setLoadingApp(false);
				setLoading(false);
			}, 900);
		}

	}, []);

	return (
		<div className="app1e">
			<div>{loadingApp && <MyLoader />}</div>
			<Navbar3 />
			<ToastContainer
				closeButton={false}
				position="bottom-left"
				autoClose={1000}
			/>
			<div className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/accueil" element={<Home />} />
					<Route path="/panier" element={<Panier />} />
					<Route path="/notifications" element={<NotificationAllList />} />
					{/*<Route path="/login" element={<LoginPage/>}/>*/}
					{/*<Route path="/register" element={<RegisterPage/>}/>*/}
					<Route path="/livraison" element={<OrderState />} />
					<Route path="/contact" element={<Apropos />} />
					{/*    profile*/}
					<Route path="/profil" element={<UserProfile />} />
					{/*    other to home*/}
					<Route path="*" element={<Home />} />
				</Routes>
			</div>

			<Footer />
			<ScrollToTop smooth />
		</div>
	);
};

export default App;
