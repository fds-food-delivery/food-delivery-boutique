import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

import "./CommandeForm.css";

const CommandeForm = () => {
	const [selectedPayment, setSelectedPayment] = useState(null);
	const { totalPrice, cartItems } = useContext(StoreContext);

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};

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

			<button className="panier-commande-btn">Valider ma commande</button>
		</div>
	);
};

export default CommandeForm;
