import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Logo générique « Food Delivery » : badge arrondi aux couleurs de la marque
// avec couverts (fork + couteau) en trait, plus le nom. `showText` permet de
// n'afficher que le pictogramme (favicon, petits espaces).
const Logo = ({ height = 40, showText = true }) => (
	<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
		<Box
			component="svg"
			viewBox="0 0 48 48"
			role="img"
			aria-label="Food Delivery"
			sx={{ width: height, height, display: "block", flexShrink: 0 }}
		>
			<rect x="3" y="3" width="42" height="42" rx="12" fill="#f86c6b" />
			<g
				fill="none"
				stroke="#fff"
				strokeWidth="2.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{/* Fourchette */}
				<path d="M17 13v5" />
				<path d="M20 13v5" />
				<path d="M23 13v5" />
				<path d="M17 18h6" />
				<path d="M20 18v17" />
				{/* Couteau */}
				<path d="M30 13c2.6 1.8 2.6 7.2 0 9" />
				<path d="M30 22v13" />
			</g>
		</Box>

		{showText && (
			<Typography
				component="span"
				sx={{
					fontWeight: 800,
					fontSize: height * 0.42,
					lineHeight: 1,
					letterSpacing: "-0.02em",
					whiteSpace: "nowrap",
					color: "text.primary",
				}}
			>
				Food<Box component="span" sx={{ color: "primary.main" }}>Delivery</Box>
			</Typography>
		)}
	</Box>
);

export default Logo;
