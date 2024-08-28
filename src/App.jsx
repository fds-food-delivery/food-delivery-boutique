// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Accueil/Home.jsx";
import Panier from "./pages/Panier/Panier";
import Commande from "./pages/Commande/Commande";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/Login/Login";
import OrderState from "./pages/Livraison/OrderState";
import Apropos from "./pages/Contact/Apropos.jsx";
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
import {FaCheckCircle, FaTimes} from "react-icons/fa";


const App = () => {
    const { loading } = useContext(StoreContext);
    const {
        isModalOpen,
        closeModal,
        openModalHandle,
        modalChildren,
        handleConfirmedOrder,
        selectedPayment,
        totalPrice,
        cartItems,
        openModalErrorHandle,
        setOpenModalHandle,
        currentUser,
        setOpenModalValiderHandle,
        openModalValiderHandle, // Add comma here
        openModalValidatedHandle, setOpenModalValidatedHandle, setOpenModalErrorHandle
    } = useContext(StoreContext);
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
                <Route path="/contact" element={<Apropos/>}/>
                {/*    profile*/}
                <Route path="/profil" element={<UserProfile/>}/>
            </Routes>

            <Modal
                show={openModalValidatedHandle}
                title="Commande validée"
                onClose={() => setOpenModalValidatedHandle(false)}
            >
                <div className="container">
                    <div className="row">
                        <h4
                            className="text-center mb-4 text-primary"
                        >
       <span
                                className="text-success mr-2"
                            >Votre commande a été validée
        </span>
                            <FaCheckCircle style={{ color: "green", fontSize: "50px" }} />
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-6 mx-auto">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setOpenModalValidatedHandle(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            {/*Refect modal*/}
            <Modal
                show={openModalErrorHandle}
                title="Commande non validée"
                onClose={() => setOpenModalErrorHandle(false)}
            >
                <div className="container">
                    <div className="row">
                        <h4
                            className="text-center mb-4 text-primary"
                        >
       <span
                                className="text-danger mr-2"
                            >Votre commande n'a pas été validée
        </span>
                            <FaTimes style={{ color: "red", fontSize: "50px" }} />
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-6 mx-auto">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setOpenModalErrorHandle(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            {/*confirmation de commande */}

            <Modal
                show={openModalValiderHandle}
                title="Confirmation de commande"
                onClick={() => setOpenModalValiderHandle(false)}

            >
                <div className="container">
                    <div className="row">
                        <p>
                            <span>Nom complet : </span>
                            {currentUser?.name}
                        </p>

                        <p>
                            <span>Numero de telephone : </span>
                            {currentUser?.phone}
                        </p>
                        <p>
                            <span>Adresse : </span>
                            {currentUser?.address?.street}, {currentUser?.address?.city}
                        </p>
                        <p>
                            <span>Prix total : </span>
                            {totalPrice()} FCFA
                        </p>
                        <p>
                            <span>Mode Paiement : </span>
                            {selectedPayment === "wave" ? "Wave" : "A la livraison"}
                        </p>
                    </div>

<div className="row">
    <div className="col-6">
        <button
            className="button-confirm"
            onClick={handleConfirmedOrder}
        >
            <FaCheckCircle className="button-icon" />
            Confirmer
        </button>
    </div>
    <div className="col-6">
        <button
            className="button-cancel"
            onClick={() => setOpenModalValiderHandle(false)}
        >
            <FaTimes className="button-icon" />
            Annuler
        </button>
    </div>
</div>
                </div>
            </Modal>

            <Footer/>
            <ScrollToTop smooth />
        </div>

    );
};

export default App;