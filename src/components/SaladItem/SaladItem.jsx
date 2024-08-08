import React from "react";
import "./SaladItem.css";

const SaladItem = ({
	id,
	name,
	description,
	price,
	image,
	cartItems,
	addToCart,
	removeFromCart,
}) => {
	return (
		<div className="food-item">
			<div className="food-item-img-container">
				<img src={image} alt={name} className="food-item-image" />
				{cartItems[id] ? (
					<div className="food-item-counter">
						<img
							onClick={() => removeFromCart(id)}
							src="path/to/remove_icon_red.png" // Remplacer par le chemin réel de l'image
							alt="Remove"
						/>
						<p>{cartItems[id]}</p>
						<img
							onClick={() => addToCart(id)}
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmHJoeQvmM7xSqWy8PgOPqO6pP7wpQKByPkg&s" // Remplacer par le chemin réel de l'image
							alt="Add"
						/>
					</div>
				) : (
					<img
						onClick={() => addToCart(id)}
						src={assets.add_icon_white}
						alt="Add"
						className="add"
					/>
				)}
			</div>
			<div className="food-item-info">
				<div className="food-item-name-rating">
					<p>{name}</p>
				</div>
				<p className="food-item-desc">{description}</p>
				<p className="food-item-price">${price}</p>
			</div>
		</div>
	);
};

export default SaladItem;
