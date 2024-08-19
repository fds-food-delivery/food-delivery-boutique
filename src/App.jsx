
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
import Modal from './components/Modal/Modal';

import Navbar3 from "./components/Navbar/Navbar3";

import "./App.css";
import { ClipLoader } from "react-spinners";
import ScrollToTop from 'react-scroll-to-top';
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext.jsx";
import UserProfile from "./components/Profile/UserProfile.jsx";


const App = () => {
    const { loading } = useContext(StoreContext);
    const { isModalOpen, closeModal, openModalHandle, modalChildren} = useContext(StoreContext);


    return (

                <div className="app1e">
                    <Navbar3 />
                    <ToastContainer closeButton={false} position="bottom-left" />
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/panier" element={<Panier />} />
                        <Route path="/commande" element={<Commande />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/livraison" element={<OrderState />} />
                        <Route path="/contact" element={<Contact />} />
                    {/*    profile*/}
                        <Route path="/profil" element={<UserProfile />} />
                    </Routes>
                    <Footer />
                    <ScrollToTop fill="#f86c6b" color="#f86c6b" />
                </div>

    );
};

export default App;