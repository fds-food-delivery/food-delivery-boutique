import React, { useContext, useEffect } from "react";
import "./AlertPanier.css";
import { StoreContext } from "../../context/StoreContext";

const AlertPanier = ({ message }) => {
	const { isShowAlertPanier, closeAlert } = useContext(StoreContext);

	useEffect(() => {
		if (isShowAlertPanier) {
			const timer = setTimeout(() => {
				closeAlert();
			}, 3000); // Disparaître après 3 secondes

			return () => clearTimeout(timer); // Nettoyer le timer
		}
	}, [isShowAlertPanier, closeAlert]);

	if (!isShowAlertPanier) {
		return null; // Ne rien rendre si l'alerte n'est pas visible
	}

	return (
		<div className="alert-container">
			<div className="alert bg-green-500 text-white text-sm p-4 rounded-lg shadow-md transition-opacity duration-300 ease-in-out">
				{message}
				<button className="close-button" onClick={closeAlert}>
					&times;
				</button>
			</div>
		</div>
	);
};

export { AlertPanier };
