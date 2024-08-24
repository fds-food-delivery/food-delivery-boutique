import  { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./CommandeForm.css";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal.jsx";
import {FaCheckCircle} from "react-icons/fa";


// toast

const CommandeForm = () => {
	const [selectedPayment, setSelectedPayment] = useState(null);
	const { totalPrice, cartItems, validerCommande } = useContext(StoreContext);
	const [nomComplet, setNomComplet] = useState("");
	const [contact, setContact] = useState("");
	const [openModalHandle, setOpenModalHandle] = useState(false);

	const { currentUser } = useContext(StoreContext);

	const handlePaymentChange = (event) => {
		setSelectedPayment(event.target.value);
	};
	const [openModalValidatedHandle, setOpenModalValidatedHandle] = useState(false);

	const handleConfirmed = () => {
		const reponse = validerCommande();
		if (reponse) {
			setOpenModalHandle(false);
			//show to the user that the command is validated
			setOpenModalValidatedHandle(true);
		}else{
			toast.error("Erreur lors de la validation de la commande");
		}
	};
	// setOpenModalValidatedHandle


	return (
		<div className="commande-form">
			{/*succes modal*/}
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


			{/*confirmation de commande */}

			<Modal
				show={openModalHandle}
				title="Confirmation de commande"
				onClose={() => setOpenModalHandle(false)}
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
							{currentUser?.address.street}, {currentUser?.address.city}
						</p>
						<p>
							<span>Quantite : </span>
							{Object.keys(cartItems).reduce((acc, id) => acc + cartItems[id], 0)}
						</p>
						<p>
							<span>Prix total : </span>
							{totalPrice()} FCFA
						</p>
						<p>
							<span>Paiement : </span>
							{selectedPayment === "wave" ? "Wave" : "A la livraison"}
						</p>
					</div>
					<div className="row">
						<div className="col-6">
							<button
								className="btn btn-primary"
								onClick={handleConfirmed}
								style={{ color: "white",backgroundColor: "green" }}
							>
								Confirmer
							</button>
						</div>
						<div className="col-6">
							<button
								className="btn btn-warning"
								style={{ color: "white" , backgroundColor: "red"}}
								onClick={() => setOpenModalHandle(false)}
							>
								Annuler
							</button>
						</div>
					</div>
				</div>
			</Modal>

			<div
				className="form-group-info
			disabled:bg-gray-400
			"
			>
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
						disabled={true}
						style={{ cursor: "not-allowed" }}
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
				disabled={!selectedPayment}
				onClick={() => {
					setOpenModalHandle(true);
				}}
			>
				Valider ma commande
			</button>
		</div>
	);
};

export default CommandeForm;
