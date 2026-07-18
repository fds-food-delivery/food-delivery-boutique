import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";

import { useStore } from "../../store/useStore";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const FoodItem = ({ id, name, price, description,category, sousCategory,  image }) => {
	const { cartItems, addToCart, removeFromCart, url, urlS3 } = useStore();

	const renderCartActions = () => {
		return cartItems[id] ? (
			<div className="food-item-counter">
				<img
					onClick={() => removeFromCart(id)}
					src={assets.remove_icon_red}
					alt="Remove from cart"
					aria-label="Remove one item"
				/>
				<span>{cartItems[id]}</span>
				<img
					onClick={() => addToCart(id)}
					src={assets.add_icon_green}
					alt="Add to cart"
					aria-label="Add one more item"
				/>
			</div>
		) : (
			<img
				className="add"
				onClick={() => addToCart(id)}
				src={assets.add_icon_white}
				alt="Add to cart"
				aria-label="Add to cart"
			/>
		);
	};

	return (
		<div className="food-item">
			<div className="food-item-img-container">
				<img
					src={resolveImageUrl(image, urlS3) || "https://placehold.co/300"}
					alt={name}
					className="food-item-image"
					onError={(e) => {
						e.target.src = "https://placehold.co/300";
					}}

				/>
				{renderCartActions()}
			</div>
			<div className="food-item-info">
				<h3 className="food-item-name1">{name}</h3>
				<span className="small food-item-category">{category}</span>
				{category && (
				<h6>
					Categorie : {category}, {sousCategory? sousCategory : ""}
				</h6>
				)}
				<p className="food-item-desc">{description}</p>
				<p className="food-item-price">{price} FCFA</p>
			</div>
		</div>
	);
};

export default FoodItem;
