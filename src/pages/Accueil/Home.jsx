import {useContext, useEffect, useState} from "react";
import "./Accueil.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { StoreContext } from "../../context/StoreContext.jsx";
// ClipLoader
import { ClipLoader } from "react-spinners";

const Home = () => {
	const [category, setCategory] = useState("All");
	const { loading, setLoading } = useContext(StoreContext);

	useEffect(() => {
		setLoading(false);
	}, [setLoading]);
	return (
		<div className="container custom-container">
			<div
				className="mt-5"
				style={{ marinTop: "100px", marginBottom: "130px" }}
			></div>
			<Header />
			{loading ? (
				<div className="loader">
					<ClipLoader color="#f86c6b" loading={loading} size={150} />
				</div>
			) : (
				<>
					<ExploreMenu category={category} setCategory={setCategory} />
					<FoodDisplay category={category} />
				</>
			)}
		</div>
	);
};

export default Home;
