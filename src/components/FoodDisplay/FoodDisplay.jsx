import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useStore } from "../../store/useStore";
import FoodItem from "../FoodItem/FoodItem";

const FoodGrid = ({ items }) => (
	<Grid container spacing={2} sx={{ mb: 4 }}>
		{items.map((item) => (
			<Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
				<FoodItem
					id={item._id}
					name={item.name}
					description={item.description}
					category={item.category}
					sousCategory={item.sousCategory}
					price={item.price}
					image={item.image}
				/>
			</Grid>
		))}
	</Grid>
);

const FoodDisplay = ({ category }) => {
	const { foodList, loading } = useStore();

	const { saladeTypesListe, saladeSauce, saladeSupplementaire } = useMemo(
		() => ({
			saladeTypesListe: foodList.filter(
				(item) => item.category === "Salade" && item.sousCategory === "Salade"
			),
			saladeSauce: foodList.filter((item) => item.sousCategory === "Sauce"),
			saladeSupplementaire: foodList.filter((item) => item.sousCategory === "Supplement"),
		}),
		[foodList]
	);

	if (loading) {
		return (
			<Stack alignItems="center" sx={{ py: 8 }}>
				<CircularProgress sx={{ color: "primary.main" }} size={60} />
			</Stack>
		);
	}

	if (category === "Salade") {
		return (
			<Box id="food-display">
				<Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
					Composez votre salade
				</Typography>
				<FoodGrid items={saladeTypesListe} />

				{saladeSauce.length > 0 && (
					<>
						<Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
							Composez votre sauce
						</Typography>
						<FoodGrid items={saladeSauce} />
					</>
				)}

				{saladeSupplementaire.length > 0 && (
					<>
						<Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
							Composez votre condiment
						</Typography>
						<FoodGrid items={saladeSupplementaire} />
					</>
				)}
			</Box>
		);
	}

	const filteredItems = foodList.filter(
		(item) => category === "All" || category === item.category
	);

	return (
		<Box id="food-display">
			<Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
				Meilleurs plats
			</Typography>
			<FoodGrid items={filteredItems} />
		</Box>
	);
};

export default FoodDisplay;
