import React, { useEffect, useState } from "react";
import "./FoodDisplay.css";
import { useStore } from "../../store/useStore";
import FoodItem from "../FoodItem/FoodItem";
import SaladOptions from "../SaladOptions/SaladOptions";
import { ClipLoader } from "react-spinners";

const FoodDisplay = ({ category }) => {
    const {
        foodList,
        cartItems,
        addToCart,
        loading,
        removeFromCart,
    } = useStore();

    const [saladeTypesListe, setSaladeTypesListe] = useState([]);
    const [saladeSauce, setSaladeSauce] = useState([]);
    const [saladeSupplementaire, setSaladeSupplementaire] = useState([]);

    useEffect(() => {
        setSaladeTypesListe(foodList.filter((item) => item.category === "Salade" && item.sousCategory === "Salade"));
        setSaladeSauce(foodList.filter((item) => item.sousCategory === "Sauce"));
        setSaladeSupplementaire(foodList.filter((item) => item.sousCategory === "Supplement"));
        console.log("foodList", foodList);
        console.log("saladeTypesListe", saladeTypesListe);
        console.log("saladeSauce", saladeSauce);
        console.log("saladeSupplementaire", saladeSupplementaire);
    }, [foodList]);

    const renderSaladOptions = () => (
        <div className="food-display-list">
            {saladeTypesListe.map((item) => (
                <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    category={item.category}
                    sousCategory={item.sousCategory}
                    price={item.price}
                    image={item.image}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </div>
    );

    const renderSaladSaucesOptions = () => (
        <div className="food-display-list">
            {saladeSauce.map((item) => (
                <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    category={item.category}
                    sousCategory={item.sousCategory}
                    price={item.price}
                    image={item.image}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </div>
    );

    const renderSaladCondimentsOptions = () => (
        <div className="food-display-list">
            {saladeSupplementaire.map((item) => (
                <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    category={item.category}
                    sousCategory={item.sousCategory}
                    price={item.price}
                    image={item.image}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </div>
    );

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
                            category={item.category}
                            sousCategory={item.sousCategory}
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

            {category === "Salade" && (
                <>
                    {renderSaladOptions()}
                    {saladeSauce.length > 0 && (
                        <>
                            <h2 className="food-display-title">Composez votre sauce</h2>
                            {renderSaladSaucesOptions()}
                        </>
                    )}
                    {saladeSupplementaire.length > 0 && (
                        <>
                            <h2 className="food-display-title">Composez votre condiment</h2>
                            {renderSaladCondimentsOptions()}
                        </>
                    )}
                </>
            )}
            {category !== "Salade" && renderFoodItems()}
        </div>
    );
};

export default FoodDisplay;
