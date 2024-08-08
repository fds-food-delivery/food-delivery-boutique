import React, { useContext } from "react";
import "./Panier.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CommandeForm from "../../components/CommandeForm/CommandeForm";

const Panier = ({ onClose }) => {
	const {
		cartItems,
		food_list,
		addToCart,
		removeFromCart,
		deleteFromCart,
		isShowAlertPanier,
		setIsShowAlertPanier,
		totalPrice,
	} = useContext(StoreContext);

	const cartContent = Object.keys(cartItems).map((id) => {
		const item = food_list.find((food) => food._id === id);

		return (
			<div key={id} className="panier-item">
				<img src={item.image} alt={item.name} className="panier-item-image" />
				<div className="panier-item-details">
					<div className="panier-item-name">
						<p>{item.name}</p>
						<p
							style={{
								color: "black",
								fontWeight: "bold",
								fontSize: "1.2em",
							}}>
							{item.price}
						</p>
					</div>

					<div className="panier-item-quantite">
						<img
							width={20}
							onClick={() => removeFromCart(id)}
							src={assets.remove_icon_red}
							alt="Remove"
						/>
						<p
							style={{
								margin: "0 10px",
								fontSize: "1.5em",
							}}>
							{cartItems[id]}
						</p>
						<img
							width={20}
							onClick={() => {
								addToCart(id);
								setIsShowAlertPanier(true);
							}} // Ensure you have defined addToCart function in your context or props
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmHJoeQvmM7xSqWy8PgOPqO6pP7wpQKByPkg&s" // Replace with the actual image path
							alt="Add"
						/>
						<span
							style={{
								cursor: "pointer",
								color: "black",
								marginLeft: "auto",
							}}
							onClick={() => deleteFromCart(id)}>
							<FontAwesomeIcon icon={faTrash} />
						</span>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="panier">
			<div className="panier-header">
				<h2>Ma Commande</h2>
				<button onClick={onClose}>Fermer</button>
			</div>
			<div className="panier-content">
				{cartContent.length > 0 ? cartContent : <p>Votre panier est vide</p>}
			</div>
			{/* Total quantite , prix */}
			{cartContent.length > 0 && (
				<div className="panier-footer">
					<div>
						<CommandeForm />
					</div>
				</div>
			)}
		</div>
	);
};

export default Panier;
