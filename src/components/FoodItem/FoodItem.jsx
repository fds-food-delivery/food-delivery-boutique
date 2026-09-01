import React, { memo, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useStore } from "../../store/useStore";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const FALLBACK_IMAGE = "https://placehold.co/300";

const FoodItem = ({ id, name, price, description, category, sousCategory, image }) => {
	const { cartItems, addToCart, removeFromCart } = useStore();
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageSrc, setImageSrc] = useState(resolveImageUrl(image) || FALLBACK_IMAGE);

	const quantity = cartItems[id] || 0;

	return (
		<Card
			elevation={2}
			sx={{
				width: "100%",
				maxWidth: 300,
				mx: "auto",
				my: 1.25,
				borderRadius: 3,
				display: "flex",
				flexDirection: "column",
				transition: "box-shadow 0.3s ease, transform 0.2s ease",
				"&:hover": {
					boxShadow: 6,
					transform: "translateY(-2px)",
				},
			}}
		>
			<Box sx={{ position: "relative", pt: "75%" }}>
				{!imageLoaded && (
					<Skeleton
						variant="rectangular"
						animation="wave"
						sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
					/>
				)}
				<CardMedia
					component="img"
					image={imageSrc}
					alt={name}
					loading="lazy"
					onLoad={() => setImageLoaded(true)}
					onError={() => {
						setImageSrc(FALLBACK_IMAGE);
						setImageLoaded(true);
					}}
					sx={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
						opacity: imageLoaded ? 1 : 0,
						transition: "opacity 0.3s ease",
					}}
				/>

				{quantity === 0 ? (
					<IconButton
						color="primary"
						aria-label="Ajouter au panier"
						onClick={() => addToCart(id)}
						sx={{
							position: "absolute",
							bottom: 12,
							right: 12,
							bgcolor: "background.paper",
							boxShadow: 2,
							"&:hover": { bgcolor: "background.paper" },
						}}
					>
						<AddShoppingCartIcon fontSize="small" />
					</IconButton>
				) : (
					<Stack
						direction="row"
						alignItems="center"
						spacing={0.5}
						sx={{
							position: "absolute",
							bottom: 12,
							right: 12,
							bgcolor: "background.paper",
							borderRadius: 5,
							boxShadow: 2,
							px: 0.5,
							py: 0.25,
						}}
					>
						<IconButton
							size="small"
							color="primary"
							aria-label="Retirer un article"
							onClick={() => removeFromCart(id)}
						>
							<RemoveIcon fontSize="small" />
						</IconButton>
						<Typography variant="body2" sx={{ minWidth: 16, textAlign: "center" }}>
							{quantity}
						</Typography>
						<IconButton
							size="small"
							color="primary"
							aria-label="Ajouter un article"
							onClick={() => addToCart(id)}
						>
							<AddIcon fontSize="small" />
						</IconButton>
					</Stack>
				)}
			</Box>

			<CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
				<Typography variant="h6" component="h3" noWrap>
					{name}
				</Typography>

				{category && (
					<Stack direction="row" spacing={0.5} justifyContent="center" sx={{ my: 0.75 }}>
						<Chip label={category} size="small" color="primary" variant="outlined" />
						{sousCategory && (
							<Chip label={sousCategory} size="small" variant="outlined" />
						)}
					</Stack>
				)}

				<Typography
					variant="body2"
					color="text.secondary"
					sx={{
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{description}
				</Typography>

				<Typography variant="subtitle1" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
					{price} FCFA
				</Typography>
			</CardContent>
		</Card>
	);
};

export default memo(FoodItem);
