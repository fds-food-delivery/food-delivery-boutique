import { useState } from "react";
import { useStore } from "../../store/useStore";
import "./CommandeForm.css";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal.jsx";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

// toast

const CommandeForm = () => {
	const [selectedPayment, setSelectedPayment] = useState(null);
	const {
		totalPrice,
		cartItems,
		validerCommande,
		openModalValidatedHandle,
		setOpenModalValidatedHandle,
		openModalErrorHandle,
		setOpenModalErrorHandle,
		openModalValiderHandle,
		setOpenModalValiderHandle,
		handleConfirmedOrder,
		currentUser,
	} = useStore();
	const [nomComplet, setNomComplet] = useState("");
	const [contact, setContact] = useState("");
	const [openModalHandle, setOpenModalHandle] = useState(false);

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};
	return (
		<div className="commande-form">
			<div className="form-group-payment"></div>
			<div className="form-group-payment mb-3">
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
				// disabled={!selectedPayment}
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
