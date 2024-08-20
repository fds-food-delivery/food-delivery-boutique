import React, { useContext } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./Panier.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CommandeForm from "../../components/CommandeForm/CommandeForm";

const Panier = ({ onClose }) => {
	const {
		cartItems,
		foodList,
		addToCart,
		removeFromCart,
		deleteFromCart,
		setIsShowAlertPanier,
		currentUser,
		url,
	} = useContext(StoreContext);

	const cartContent = Object.keys(cartItems).map((id) => {
		const ensureImageExtension = (imageName) => {
			if (imageName.endsWith(".png") || imageName.endsWith(".jpg")) {
				return imageName;
			} else {
				return `${imageName}.png`;
			}
		};

		const item = foodList.find((food) => food._id === id);
		const correctedImageName = ensureImageExtension(item.image);

		return (
			<Row key={id} className="panier-item mb-3">
				<Col xs={4} md={2}>
					<Image
						src={
							item.image
								? `${url}/api/v1/foods/image/${correctedImageName}`
								: "https://placehold.co/300"
						}
						alt={item.name}
						className="panier-item-image"
						onError={(e) => {
							e.target.src = "https://placehold.co/300";
						}}
						fluid
					/>
				</Col>
				<Col xs={8} md={10}>
					<div className="panier-item-details">
						<div className="panier-item-name">
							<p>{item.name}</p>
							<p className="font-weight-bold" style={{ fontSize: "1.2em" }}>
								{item.price}
							</p>
						</div>
						<div className="panier-item-quantite d-flex align-items-center">
							<Image
								width={20}
								onClick={() => removeFromCart(id)}
								src={assets.remove_icon_red}
								alt="Remove"
								className="mr-2"
							/>
							<p className="m-0" style={{ fontSize: "1.5em" }}>
								{cartItems[id]}
							</p>
							<Image
								width={20}
								onClick={() => {
									addToCart(id);
									setIsShowAlertPanier(true);
								}}
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmHJoeQvmM7xSqWy8PgOPqO6pP7wpQKByPkg&s"
								alt="Add"
								className="ml-2"
							/>
							<span
								style={{
									cursor: "pointer",
									color: "black",
									marginLeft: "auto",
								}}
								onClick={() => deleteFromCart(id)}
							>
								<FontAwesomeIcon icon={faTrash} />
							</span>
						</div>
					</div>
				</Col>
			</Row>
		);
	});

	return (
		<Container fluid className="panier">
			<Row className="panier-header">
				<Col>
					<h2>Ma Commande</h2>
				</Col>
				<Col className="text-right">
					<Button variant="secondary" onClick={onClose}>
						Fermer
					</Button>
				</Col>
			</Row>
			<Row className="panier-content">
				<Col>
					{cartContent.length > 0 ? cartContent : <p>Votre panier est vide</p>}
				</Col>
			</Row>
			{cartContent.length > 0 && (
				<Row className="panier-footer">
					<Col>
						<CommandeForm />
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default Panier;
