import React, {useContext, useEffect, useState} from 'react';
import { assets } from "../../assets/assets.js";
import { FaCartPlus, FaSearch, FaUser, FaSignInAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CartIconWithCount from "./CartIconWithCount";
import PanierWithCount from "./PanierWithCount.jsx";
import {StoreContext} from "../../context/StoreContext.jsx";

const Navbar2 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Remplacer par l'état réel de connexion
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
const { cartItems, addToCart,currentUser, removeFromCart, isAuthenticated } = useContext(StoreContext);
    useEffect(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <div>
            <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <a href="#" className="flex items-center">
                        <img src={assets.logo} className="h-6 mr-3 sm:h-9" alt="Logo"/>
                    </a>

                    <div className="flex items-center lg:order-2">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    <div
                        className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 dark:text-gray-400 lg:dark:hover:text-white dark:border-gray-700">
                            <li>
                                <a href="#"
                                   className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white text-3xl lg:text-3xl"
                                   aria-current="page">
                                    Accueil
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent text-3xl lg:text-3xl">
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent text-3xl lg:text-3xl">
                                    Livraison
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent text-3xl lg:text-3xl">
                                    Contact
                                </a>
                            </li>
                            <li className="lg:hidden">
                                <PanierWithCount itemCount={15}/>
                            </li>
                            {isAuthenticated && (
                                <li className="lg:hidden">
                                    <a href="/logout"
                                       className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent text-3xl lg:text-3xl">
                                        Se Déconnecter
                                    </a>
                                </li>
                            )}
                        </ul>
                        
                        <div className="ml-4 hidden 
                        gap-10
                         lg:flex items-center justify-between" id="profil-menu">
                            <div className="flex items-center">
                                <CartIconWithCount size={30} itemCount={15}/>
                            </div>
                            <div className="flex items-center">
                                {isAuthenticated ? (
                                    <div className="relative">
                                        <button onClick={toggleProfileDropdown} className="flex items-center focus:outline-none">
                                            <FaUser size={30} className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"/>
                                        </button>
                                        {isProfileDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                                <span className="block px-4 py-2 text-gray-800 text-uppercase">{currentUser.username || 'Utilisateur'}</span>
                                                <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profil</a>
                                                <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Déconnexion</a>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a href="/login" className="flex items-center">
                                        <span className="
                                        ml-2
                                        text-3xl
                                        text-gray-600 
                                        hover:text-gray-800">
                                            Se connecter
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar2;
