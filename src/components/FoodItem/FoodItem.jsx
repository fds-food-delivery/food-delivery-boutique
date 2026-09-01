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
				height: "100%",
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
			<Box sx={{ position: "relative", pt: "78%" }}>
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
							bottom: 14,
							right: 14,
							p: 1.5,
							bgcolor: "background.paper",
							boxShadow: 2,
							"&:hover": { bgcolor: "background.paper" },
						}}
					>
						<AddShoppingCartIcon />
					</IconButton>
				) : (
					<Stack
						direction="row"
						alignItems="center"
						spacing={0.75}
						sx={{
							position: "absolute",
							bottom: 14,
							right: 14,
							bgcolor: "background.paper",
							borderRadius: 5,
							boxShadow: 2,
							px: 0.75,
							py: 0.5,
						}}
					>
						<IconButton
							color="primary"
							aria-label="Retirer un article"
							onClick={() => removeFromCart(id)}
						>
							<RemoveIcon />
						</IconButton>
						<Typography
							variant="subtitle1"
							fontWeight={600}
							sx={{ minWidth: 24, textAlign: "center" }}
						>
							{quantity}
						</Typography>
						<IconButton
							color="primary"
							aria-label="Ajouter un article"
							onClick={() => addToCart(id)}
						>
							<AddIcon />
						</IconButton>
					</Stack>
				)}
			</Box>

			<CardContent
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
					p: { xs: 2.5, sm: 3 },
				}}
			>
				<Typography
					variant="h5"
					component="h3"
					sx={{
						fontWeight: 700,
						lineHeight: 1.3,
						fontSize: { xs: "1.2rem", sm: "1.35rem" },
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					}}
				>
					{name}
				</Typography>

				{category && (
					<Stack
						direction="row"
						spacing={0.5}
						justifyContent="center"
						flexWrap="wrap"
						useFlexGap
						sx={{ my: 1.5 }}
					>
						<Chip label={category} color="primary" variant="outlined" />
						{sousCategory && <Chip label={sousCategory} variant="outlined" />}
					</Stack>
				)}

				<Typography
					variant="body1"
					color="text.secondary"
					sx={{ lineHeight: 1.7, fontSize: { xs: "0.95rem", sm: "1rem" }, mb: 2.5 }}
				>
					{description}
				</Typography>

				<Typography
					variant="h6"
					color="primary"
					fontWeight="bold"
					sx={{ mt: "auto", pt: 1, fontSize: { xs: "1.25rem", sm: "1.4rem" } }}
				>
					{price} FCFA
				</Typography>
			</CardContent>
		</Card>
	);
};

export default memo(FoodItem);
