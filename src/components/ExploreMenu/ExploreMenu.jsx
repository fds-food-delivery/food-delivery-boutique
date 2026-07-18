import React from "react";
import "./ExploreMenu.css";
import { useStore } from "../../store/useStore";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const ExploreMenu = ({ category, setCategory }) => {
	const { menu_list, url } = useStore();

	return (
		<div className="explore-menu row" id="explore-menu">
			 {/*<h1>Decouvrir nos menus</h1>*/}
			{/* <p className="explore-menu-text">
				Choisissez parmi un menu varié comprenant une gamme détectable de plats
			</p> */}
			{/*horizontale scroll siil ya pas espace*/}
			<div className="explore-menu-list" id="menu">
				{menu_list.map((item, index) => {
					return (
						<div
							id="menu-item"
							onClick={() =>
								setCategory((prev) =>
									prev === item.menu_name ? "All" : item.menu_name
								)
							}
							key={index}
							className="explore-menu-list-item">
							<img
							style={{ width: "100px", height: "100px" }}
							className={category === item.menu_name ? "active" : ""}
							src={resolveImageUrl(item.menu_image, `${url}/api/v1/categories/image`)}
							alt=""
							onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300"; }}
								/>
							<p>{item.menu_name}</p>{" "}
						</div>
					);
				})}
			</div>
			<hr />
		</div>
	);
};

export default ExploreMenu;
