import  { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./CommandeForm.css";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal.jsx";
import { Link } from "react-router-dom";
import {FaCheckCircle, FaTimes} from "react-icons/fa";

// toast

const CommandeForm = () => {
	const [selectedPayment, setSelectedPayment] = useState(null);
	const {
		totalPrice, cartItems, validerCommande,
		openModalValidatedHandle, setOpenModalValidatedHandle,
		openModalErrorHandle, setOpenModalErrorHandle,
		openModalValiderHandle, setOpenModalValiderHandle,
		handleConfirmedOrder
	} = useContext(StoreContext);
	const [nomComplet, setNomComplet] = useState("");
	const [contact, setContact] = useState("");
	const [openModalHandle, setOpenModalHandle] = useState(false);

	const { currentUser } = useContext(StoreContext);

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};
	if (currentUser === null) {
		return (
			<div className="commande-form">
	{/*			link to login*/}
				<Link to="/login">
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
						"
					>
						Connectez-vous pour commander
					</button>
				</Link>
			</div>
		);


	}

	return (
		<div className="commande-form">
			{/*succes modal*/}
			<div className="form-group-info">
    <span className="text-success">Contact</span>
    <input
        type="tel"
        id="phone"
        className="contact"
        placeholder="Numero de telephone"
        value={currentUser?.phone}
        disabled
    />
</div>

			<div className="form-group-payment">
				{/*<label className="paiement-method">*/}
				{/*	Paiement via WAVE*/}
				{/*	<input*/}
				{/*		type="radio"*/}
				{/*		name="payment"*/}
				{/*		value="wave"*/}
				{/*		checked={selectedPayment === "wave"}*/}
				{/*		disabled={true}*/}
				{/*		style={{ cursor: "not-allowed" }}*/}
				{/*		onChange={handlePaymentChange}*/}
				{/*	/>*/}
				{/*</label>*/}
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
				disabled={!selectedPayment}
				onClick={() => {
					setOpenModalValiderHandle(true);
				}}
			>
				Valider ma commande
			</button>
		</div>
	);
};

export default CommandeForm;
