import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useStore } from "../../store/useStore";
import FoodItem from "../FoodItem/FoodItem";

// Grille responsive :
//  - mobile (xs)        -> 1 carte / ligne
//  - tablette (sm/md)   -> 2 cartes / ligne (largeur mini pour laisser respirer la description)
//  - desktop (lg+)      -> 3 cartes / ligne max
// `minmax(0, 1fr)` évite les débordements de texte, `alignItems: stretch`
// (défaut) donne des hauteurs de cartes égales par rangée.
const FoodGrid = ({ items }) => (
	<Box
		sx={{
			display: "grid",
			gap: { xs: 2.5, sm: 3, md: 3.5 },
			mb: 4,
			gridTemplateColumns: {
				xs: "1fr",
				sm: "repeat(2, minmax(0, 1fr))",
				lg: "repeat(3, minmax(0, 1fr))",
			},
		}}
	>
		{items.map((item) => (
			<FoodItem
				key={item._id}
				id={item._id}
				name={item.name}
				description={item.description}
				category={item.category}
				sousCategory={item.sousCategory}
				price={item.price}
				image={item.image}
			/>
		))}
	</Box>
);

const FoodDisplay = ({ category }) => {
	const { foodList, loading } = useStore();

	const { saladeTypesListe, saladeSauce, saladeSupplementaire } = useMemo(
		() => ({
			saladeTypesListe: foodList.filter(
				(item) => item.category === "Salade" && item.sousCategory === "Salade"
			),
			saladeSauce: foodList.filter((item) => item.sousCategory === "Sauce"),
			saladeSupplementaire: foodList.filter((item) => item.sousCategory === "Supplément"),
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
