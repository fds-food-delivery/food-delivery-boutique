import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ key, id, name, price, description, image }) => {
	const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
	// const url = "https://backend-food-ordering.onrender.com";
	//const url = "http://localhost:4000";
	const ensureImageExtension = (imageName) => {
		if (imageName.endsWith(".png") || imageName.endsWith(".jpg")) {
			return imageName;
		} else {
			return `${imageName}.png`;
		}
	};
	const correctedImageName = ensureImageExtension(image);
	return (
		<div className="food-item">
			<div className="food-item-img-container">
				{/* <img className="food-item-image" src={image} alt="" /> */}
				{
					// si image se terminer par .png ou .jpg sinon on ajouter .png a la fin
				}
				<span className="food-item-name">{image}</span>
				<img
					src={
						image
							? `${url}/api/v1/foods/image/${correctedImageName}`
							: "https://placehold.co/300"
					}
					alt={name}
					className="food-item-image"
					onError={(e) => {
						e.target.src = "https://placehold.co/300";
					}} // Fallback si l'image échoue à se charger
				/>
				{!cartItems[id] ? (
					<img
						className="add"
						onClick={() => addToCart(id)}
						src={assets.add_icon_white}
						alt=""
					/>
				) : (
					<div className="food-item-counter">
						<img
							onClick={() => removeFromCart(id)}
							src={assets.remove_icon_red}
							alt=""
						/>
						<p>{cartItems[id]}</p>
						<img
							onClick={() => addToCart(id)}
							src={assets.add_icon_green}
							alt=""
						/>
					</div>
				)}
			</div>
			<div className="food-item-info">
				{/* <div className="food-item-name-rating">
					<p>{name}</p>
					<img src={assets.rating_starts} alt="" />
				</div> */}
				<p className="food-item-desc">{description}</p>
				<p className="food-item-price">{price} FCFA</p>
			</div>
		</div>
	);
};

export default FoodItem;
