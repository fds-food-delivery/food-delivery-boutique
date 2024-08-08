import React from "react";
import "./SaladOptions.css";
import FoodItem from "../FoodItem/FoodItem";

const SaladOptions = ({
	saladTypes,
	sauces,
	condiments,
	cartItems,
	addToCart,
	removeFromCart,
}) => {
	return (
		<div className="salad-options">
			<div className="food-display" id="food-display">
				<h2>Selectionnez votre salade</h2>
				<div className="food-display-list">
					{saladTypes.map((type) => (
						<FoodItem
							key={type._id}
							id={type._id}
							name={type.name}
							description={type.description}
							price={type.price}
							image={type.image}
							cartItems={cartItems}
							addToCart={addToCart}
							removeFromCart={removeFromCart}
						/>
					))}
				</div>
			</div>
			<div className="food-display" id="food-display">
				<h2>Selectionnez votre sauce</h2>
				<div className="food-display-list">
					{sauces.map((sauce) => (
						<FoodItem
							key={sauce._id}
							id={sauce._id}
							name={sauce.name}
							description={sauce.description}
							price={sauce.price}
							image={sauce.image}
							cartItems={cartItems}
							addToCart={addToCart}
							removeFromCart={removeFromCart}
						/>
					))}
				</div>
			</div>
			<div className="food-display" id="food-display">
				<h2>Selectionnez vos condiments</h2>
				<div className="food-display-list">
					{condiments.map((condiment) => (
						<FoodItem
							key={condiment._id}
							id={condiment._id}
							name={condiment.name}
							description={condiment.description}
							price={condiment.price}
							image={condiment.image}
							cartItems={cartItems}
							addToCart={addToCart}
							removeFromCart={removeFromCart}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SaladOptions;
