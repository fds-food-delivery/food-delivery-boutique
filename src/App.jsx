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
import Navbar2 from "./components/Navbar/Navbar2";
import Navbar3 from "./components/Navbar/Navbar3";
import "./App.css";

import { ClipLoader } from "react-spinners";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext.jsx";


const App = () => {
    const { loading } = useContext(StoreContext);

    return (
        <>
            {loading ? (
                <div className="loader flex justify-center items-center h-screen">
    		<ClipLoader color="#f86c6b" size={150} />
		</div>
            ) : (
                <div className="app1e">
                    <Navbar3 />
                    {/*<Navbar />*/}
                    {/*<Navbar2 />*/}


                    <ToastContainer closeButton={false} position="bottom-right" />
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/panier" element={<Panier />} />
                        <Route path="/commande" element={<Commande />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/livraison" element={<OrderState />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default App;