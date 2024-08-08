import { useContext } from "react";
import "./OrderState.css";
import "./circle.css";
import { StoreContext } from "../../context/StoreContext";

const OrderState = () => {
	const { totalPrice } = useContext(StoreContext);

	// Logic to determine if delivery is available
	// const showDeliveryMessage = !deliveryAvailable;
	const showDeliveryMessage = false;

	return (
		<div className="container-order">
			<div className="header-order">
				<span>Faites Vous Livrer Rapidement !</span>
				{!showDeliveryMessage && (
					<>
						<span>Montant De La Commande: {totalPrice()} FCFA</span>
						<span className="close-button">X</span>
					</>
				)}
			</div>
			{showDeliveryMessage ? (
				<div className="delivery-message">
					<p>La livraison n'est pas disponible pour cette commande.</p>
				</div>
			) : (
				<div>
					<div className="progress-circle">
						<div className="circle">
							<div className="inner-circle" />
							<span className="validation">Validation</span>
						</div>
						<div className="circle">
							<span className="preparation">Préparation</span>
						</div>
						<div className="circle">
							<span className="livraison">Livraison</span>
						</div>
					</div>
					<div
						style={{
							marginTop: "20px",
							textAlign: "center",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "20px",
							justifyContent: "center",
						}}>
						<p
							style={{
								fontSize: "1.2em",
								fontWeight: "bold",
								color: "black",
								marginBottom: "10px",
							}}>
							Etat de la commande :
							<span style={{ color: "green", fontWeight: "bold" }}>
								{" "}
								En cours de préparation
							</span>
						</p>

						<div class="c100 p85 big green">
							{" "}
							<span>85%</span>
							<div class="slice">
								<div class="bar"></div>
								<div class="fill"></div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderState;
