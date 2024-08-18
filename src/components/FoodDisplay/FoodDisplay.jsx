import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import SaladOptions from "../SaladOptions/SaladOptions";
import { ClipLoader } from "react-spinners";

const FoodDisplay = ({ category }) => {
    const {
        foodList,
        salade_types_liste,
        salade_sauce,
        salade_supplementaire,
        cartItems,
        addToCart,
        loading,
        removeFromCart,
    } = useContext(StoreContext);

    if (category === "Salade") {
        return (
            <div className="food-display row" id="food-display">
                <h2>Composez votre salade</h2>
                <SaladOptions
                    saladTypes={salade_types_liste}
                    sauces={salade_sauce}
                    condiments={salade_supplementaire}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            </div>
        );
    }
    // if (category === "Salade") {
    // 	return (
    // 		<div className="food-display" id="food-display">
    // 			<h2>Composez votre salade</h2>
    // 			<SaladOptions
    // 				saladTypes={salade_types_liste}
    // 				sauces={salade_sauce}
    // 				condiments={salade_supplementaire}
    // 				cartItems={cartItems}
    // 				addToCart={addToCart}
    // 				removeFromCart={removeFromCart}
    // 			/>
    // 		</div>
    // 	);
    // }

    return (
        // affiche clip loader au cas ou
        loading ? (
            <div className="loader">
                <ClipLoader color="#f86c6b" size={150} />
            </div>
        ) : (
            <div className="food-display" id="food-display">
                <h2>Meilleurs plats</h2>
                <div className="food-display-list">
                    {foodList.map((item) => {
                        if (category === "All" || category === item.category) {
                            if (!item.image) {
                                item.image =
                                    "https://res.cloudinary.com/dkzv1m5v0/image/upload/v1633089826/food_25_bq1z7v.png";
                            }

                            return (
                                <FoodItem
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                    cartItems={cartItems}
                                    addToCart={addToCart}
                                    removeFromCart={removeFromCart}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        )
    );
};

export default FoodDisplay;
