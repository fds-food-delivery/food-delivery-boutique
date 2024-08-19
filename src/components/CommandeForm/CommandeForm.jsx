import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./CommandeForm.css";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal.jsx";
// toast


const CommandeForm = () => {
	const [selectedPayment, setSelectedPayment] = useState(null);
	const { totalPrice, cartItems, validerCommande} = useContext(StoreContext);
	const [nomComplet, setNomComplet] = useState("");
	const [contact, setContact] = useState("");
	const [openModalHandle, setOpenModalHandle] = useState(false);


	const {currentUser} = useContext(StoreContext);

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};
	const handleConfirmed = () => {
		const reponse =  validerCommande();
		if (reponse) {
			toast.success("Commande validée");
		} else {
			toast.error("Erreur lors de la validation de la commande");
		}
	}
	const handleValidation = () => {
		const reponse = validerCommande();
		if (reponse) {
			openModalHandle("vous avez validé votre commande");
			toast.success("Commande validée");
		} else {
			toast.error("Erreur lors de la validation de la commande");
		}
	}

	return (
		<div className="commande-form">
			{/*confirmation de commande */}
			<Modal show={openModalHandle}>
				<div className="modal-content container bg-white p-3">
					<h2>Confirmation de commande</h2>
					<p>Voulez-vous vraiment valider votre commande ?</p>
					<div className="row">
						<div className="col-6">
					<button
						onClick={handleConfirmed}
						className="btn btn-primary"
					>Valider</button>
						</div>
						<div className="col-6">
					<button
						onClick={() => setOpenModalHandle(false)}
						className="btn btn-warning"
					>Annuler</button>
						</div>
						</div>
				</div>
			</Modal>
			<div className="form-group-info
			disabled:bg-gray-400
			">
				<input
					type="text"
					id="name"
					className="nomComplet"
					placeholder="Nom Premon"
					value={currentUser?.name}
					disabled
				/>

				<input
					type="tel"
					id="phone"
					className="contact
					disabled:bg-gray-400
					"
					placeholder="Numero de telephone"
					value={currentUser?.phone}
					disabled
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
				onClick={ () => {
					setOpenModalHandle(true);
				}
				}
			>Valider ma commande</button>
		</div>
	);
};

export default CommandeForm;
