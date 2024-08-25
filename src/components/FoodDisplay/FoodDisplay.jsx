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

    const renderSaladOptions2 = () => (
        <div className="food-display row" id="food-display">
            <h2 className="food-display-title">Composez votre salade</h2>
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
    const renderSaladOptions = () => {
    // Recuperer la liste des saladetype
    const salade_types_liste = foodList.filter((item) => item.category === "Salade" );
    // Recuperer la liste de sauce
    const salade_sauce = foodList.filter((item) => item.category === "Salade" && item.sousCategory === "Sauce");
    // Recuperer la liste de condiment
    const salade_supplementaire = foodList.filter((item) => item.category === "Salade" && item.sousCategory === "condiment");

    return (
        <div className="food-display-list">
            {salade_types_liste && salade_types_liste.map((item) => (
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
            ))}
            {salade_sauce && salade_sauce.map((item) => (
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
            ))}
            {salade_supplementaire && salade_supplementaire.map((item) => (
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
            ))}
        </div>
    );
};

    const renderFoodItems = () => (
        <div className="food-display-list">
            {foodList.map((item) => {
                if (category === "All" || category === item.category) {
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
    );

    return loading ? (
        <div className="loader">
            <ClipLoader color="#f86c6b" size={150} />
        </div>
    ) : (
        <div className="food-display" id="food-display">
            <h2 className="food-display-title">
                {category === "Salade" ? "Composez votre salade" : "Meilleurs plats"}
            </h2>
            {category === "Salade" ? renderSaladOptions() : renderFoodItems()}
        </div>
    );
};

export default FoodDisplay;
