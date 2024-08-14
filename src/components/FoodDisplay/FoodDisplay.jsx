import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import SaladOptions from "../SaladOptions/SaladOptions";
import { ClipLoader } from "react-spinners";
import { FaUtensils } from "react-icons/fa"; // Import an icon from react-icons


const FoodDisplay = ({ category }) => {
  const {
      foodList, // Liste des plats disponibles
    salade_types_liste, // Liste des types de salade
    salade_sauce, // Liste des sauces pour la salade
    salade_supplementaire, // Liste des suppléments pour la salade
    cartItems, // Liste des plats dans le panier
    addToCart, // Fonction pour ajouter un plat au panier
    loading, // Etat de chargement
    removeFromCart, // Fonction pour retirer un plat du panier
  } = useContext(StoreContext); // Récupère les données du contexte

  if (category === "Salade") {
    return (
      <div className="food-display" id="food-display">
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

  return loading ? (
    <div className="loader">
      <ClipLoader color="#f86c6b" size={150} />
    </div>
  ) : (
    <div className="food-display" id="food-display">
      <h2>Meilleurs plats</h2>
      <div className="food-display-list">
        {foodList && foodList.length > 0 ? (
          foodList.map((item) => {
              console.log(item.image);
            if (category === "All" || category === item.category) {
              // if (!item.image) {
              //   item.image =
              //     "https://res.cloudinary.com/dkzv1m5v0/image/upload/v1633089826/food_25_bq1z7v.png";
              // }

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
          })
        ) : (
			<div className="no-food-available">
				<FaUtensils size={50} color="#ccc"/>
				<p>Aucun plat disponible pour le moment</p>
                <p>Veuillez réessayer plus tard</p>
			</div>
		)}
	  </div>
	</div>
  );
};

export default FoodDisplay;