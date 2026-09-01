import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";

const LINKS = [
	{ label: "Accueil", to: "/" },
	{ label: "Menu", to: "/home#menu" },
	{ label: "Mes commandes", to: "/livraison" },
	{ label: "Contact", to: "/contact" },
];

const Footer = () => {
	return (
		<Box component="footer" sx={{ bgcolor: "grey.900", color: "grey.100", py: 5, mt: 6 }}>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" gutterBottom>
							Food Delivery
						</Typography>
						<Typography variant="body2" color="grey.400">
							Des plats délicieux, préparés rapidement et livrés chez vous.
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" gutterBottom>
							Liens utiles
						</Typography>
						<Stack spacing={0.5}>
							{LINKS.map((link) => (
								<MuiLink
									key={link.label}
									component={Link}
									to={link.to}
									color="grey.300"
									underline="hover"
								>
									{link.label}
								</MuiLink>
							))}
						</Stack>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="h6" gutterBottom>
							Contactez-nous
						</Typography>
						<Typography variant="body2" color="grey.400">
							Dakar, Sénégal
							<br />
							+221 33 123 45 67
							<br />
							contact@food-delivery.com
						</Typography>
					</Grid>
				</Grid>
				<Typography variant="body2" color="grey.500" textAlign="center" sx={{ mt: 4 }}>
					© {new Date().getFullYear()} Food Delivery — Tous droits réservés.
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer;
