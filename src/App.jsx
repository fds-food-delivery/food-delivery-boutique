
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Accueil/Home.jsx";
import Panier from "./pages/Panier/Panier";
import Commande from "./pages/Commande/Commande";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/Login/Login";
import OrderState from "./pages/Livraison/OrderState";
import Contact from "./pages/Contact/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from './components/Modal/Modal';
import MyLoader from "./Loader/MyLoader";
import { useEffect } from "react";

import Navbar3 from "./components/Navbar/Navbar3";

import "./App.css";
import { ClipLoader } from "react-spinners";
import ScrollToTop from 'react-scroll-to-top';
import {useContext, useState} from "react";
import { StoreContext } from "./context/StoreContext.jsx";
import UserProfile from "./components/Profile/UserProfile.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";


const App = () => {
    const { loading } = useContext(StoreContext);
    const { isModalOpen, closeModal, openModalHandle, modalChildren} = useContext(StoreContext);
    const [loadingApp, setLoadingApp] = useState(true);

    useEffect(() => {
            if (loading === false) {
                // Simuler un délai de chargement
                setTimeout(() => {
                    setLoadingApp(false);
                }, 900);
            }
        }, []);

    return (
        <div className="app1e">
            <div>
                {loadingApp && <MyLoader/>}
            </div>
            <Navbar3/>
            <ToastContainer closeButton={false} position="bottom-left" autoClose={1000}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/accueil" element={<Home/>}/>
                <Route path="/panier" element={<Panier/>}/>
                <Route path="/commande" element={<Commande/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/livraison" element={<OrderState/>}/>
                <Route path="/contact" element={<Contact/>}/>
                {/*    profile*/}
                <Route path="/profil" element={<UserProfile/>}/>
            </Routes>
            <Footer/>
            <ScrollToTop smooth style={{
                textAlign: "center",
                borderRadius: "50%",
                color: "white",
                fontSize: "20px",
                right: "20px",
                textDecoration: "none"
            }}/>
        </div>

    );
};

export default App;