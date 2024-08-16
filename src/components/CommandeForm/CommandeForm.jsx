import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./CommandeForm.css";
import { toast } from "react-toastify";

const CommandeForm = () => {
	const [selectedPayment, setSelectedPayment] = useState(null);
	const { totalPrice, cartItems, validerCommande } = useContext(StoreContext);

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};
	const handleValidation = () => {
		const reponse = validerCommande();
		if (reponse) {
			toast.success("Commande validée");
		} else {
			toast.error("Erreur lors de la validation de la commande");
		}
	}

	return (
		<div className="commande-form">
			<div className="form-group-info">
				<input
					type="text"
					id="name"
					className="nomComplet"
					placeholder="Nom Premon"
				/>

				<input
					type="tel"
					id="phone"
					className="contact"
					placeholder="Numero de telephone"
				/>
			</div>

			<div className="form-group-payment">
				<label className="paiement-method">
					Paiement via WAVE
					<input
						type="radio"
						name="payment"
						value="wave"
						checked={selectedPayment === "wave"}
						onChange={handlePaymentChange}
					/>
				</label>
				<label className="paiement-method">
					Paiement à livraison
					<input
						type="radio"
						name="payment"
						value="delivery"
						checked={selectedPayment === "delivery"}
						onChange={handlePaymentChange}
					/>
				</label>
			</div>
			<div className="form-group-payment">
				<label className="paiement-method">
					Quantite :
					{Object.keys(cartItems).reduce((acc, id) => acc + cartItems[id], 0)}
				</label>
				<label className="paiement-method">
					Prix total : {totalPrice()} FCFA
				</label>
			</div>
			{/*desgn tailwind*/}
			<button
				className="
					bg-blue-500
					hover:bg-blue-700
					text-white
					font-bold
					py-2
					px-4
					rounded
					focus:outline-none
					focus:shadow-outline
					transition duration-300
					ease-in-out
					disabled:cursor-not-allowed
					disabled:bg-gray-400
					disabled:opacity-50
					disabled:hover:bg-gray-400
					disabled:hover:cursor-not-allowed
				"
				disabled = {!selectedPayment}
				onClick={handleValidation}
			>Valider ma commande</button>
		</div>
	);
};

export default CommandeForm;
