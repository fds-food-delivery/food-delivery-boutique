import React from "react";
import "./Header.css";

const Header = () => {
	return (
		<div className=" custom-header header mt-5">
			<div className="header-contents">
				<h2>Commandez ici votre plat préféré</h2>
				<p>
					Choisissez parmi un menu varié proposant une gamme délicieuse de plats
					préparés avec les meilleurs ingrédients et l'expertise culinaire.
					Notre mission est de satisfaire vos envies et d'améliorer votre
					expérience culinaire, un délicieux repas à la fois.
				</p>
				{/* <button>Voir le Menu</button> */}
			</div>
		</div>
	);
};

export default Header;
