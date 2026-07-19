import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = () => {
	return (
		<Box
			sx={{
				position: "relative",
				borderRadius: 4,
				overflow: "hidden",
				minHeight: { xs: 280, md: 420 },
				display: "flex",
				alignItems: "flex-end",
				backgroundImage: "url('/header_img.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				mb: 4,
			}}
		>
			<Box
				sx={{
					position: "absolute",
					inset: 0,
					background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
				}}
			/>
			<Box sx={{ position: "relative", p: { xs: 3, md: 5 }, maxWidth: 560 }}>
				<Typography
					variant="h3"
					sx={{ color: "primary.light", fontWeight: 700, mb: 1, fontSize: { xs: "1.8rem", md: "2.6rem" } }}
				>
					Commandez ici votre plat préféré
				</Typography>
				<Typography variant="body1" sx={{ color: "common.white", fontStyle: "italic" }}>
					Choisissez parmi un menu varié proposant une gamme délicieuse de plats
					préparés avec les meilleurs ingrédients et l'expertise culinaire.
				</Typography>
			</Box>
		</Box>
	);
};

export default Header;
