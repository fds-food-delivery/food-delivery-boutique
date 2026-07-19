import { useState } from "react";
import Container from "@mui/material/Container";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Home = () => {
	const [category, setCategory] = useState("All");

	return (
		<Container maxWidth="lg" sx={{ mt: { xs: 10, md: 12 }, mb: 6 }}>
			<Header />
			<ExploreMenu category={category} setCategory={setCategory} />
			<FoodDisplay category={category} />
		</Container>
	);
};

export default Home;
